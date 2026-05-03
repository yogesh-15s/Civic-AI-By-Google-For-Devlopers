const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { GoogleGenerativeAI } = require('@google/generative-ai');

function createApp() {
  const app = express();

  // Security headers
  app.use(helmet());

  // CORS configuration
  const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));

  // Body parsing with size limits
  app.use(express.json({ limit: '10kb' }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { message: "Too many requests from this IP, please try again after 15 minutes" }
  });
  app.use('/api/', limiter);

  // Gemini Setup
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

  const SYSTEM_PROMPT = `You are CivicAI, a smart, friendly, and politically neutral election assistant for Indian citizens.

Your role is to:
1. Educate citizens about elections, voter registration, voting rights, and democratic processes in India.
2. Explain how to register to vote (Form 6, 8, 8A), find polling booths, and use EVM machines.
3. Provide step-by-step guidance for first-time voters.
4. Answer questions about the Election Commission of India (ECI), NOTA, candidacy rules, etc.
5. Respond in the same language as the user (Hindi or English), or mix both if needed.
6. Keep responses concise, clear, and accessible to all literacy levels.
7. Always be politically neutral — do NOT promote or criticize any political party, candidate, or ideology.
8. Use emojis and bullet points to make responses engaging and easy to read.
9. If asked about specific candidates or parties, redirect to factual, public information only.
10. Encourage civic participation and voting.

Key resources you know:
- Voter registration: voter.eci.gov.in
- Voter helpline: 1950
- NVSP portal: nvsp.in
- Documents accepted: Aadhaar, Passport, Driving License, MNREGA card, PAN Card, and 8 others approved by ECI
- NOTA: None of the Above — button at end of EVM ballot
- EVM: Electronic Voting Machine — tamper-proof, no internet connection
- Election types: Lok Sabha (national), Vidhan Sabha (state), Gram Panchayat (local)

Always end with an encouraging note about civic participation.`;

  // Schema Validation
  const ChatSchema = z.object({
    messages: z.array(z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().min(1).max(2000)
    })).min(1).max(20),
    language: z.enum(['en', 'hi']).optional()
  });

  // Auth Middleware (Simple API Key for now)
  const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (process.env.INTERNAL_API_KEY && apiKey !== process.env.INTERNAL_API_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  app.get('/', (req, res) => {
    res.send('CivicAI Backend is running safely!');
  });

  app.post('/api/chat', authMiddleware, async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        return res.json({
          message: "⚠️ Gemini API key not configured on server. Please add GEMINI_API_KEY to your backend .env file.\n\nDemo mode: I'm CivicAI! To vote in India, register at voter.eci.gov.in!"
        });
      }

      // Validate request body
      const validation = ChatSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid request payload", errors: validation.error.errors });
      }

      const { messages, language } = validation.data;

      const langInstruction = language === 'hi'
        ? 'Please respond in Hindi (Devanagari script) as the user prefers Hindi.'
        : 'Please respond in English.';

      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: `${SYSTEM_PROMPT}\n\n${langInstruction}`
      });

      const formattedHistory = messages.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const lastMessage = formattedHistory.pop();
      
      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7,
        }
      });

      const result = await chat.sendMessage(lastMessage.parts[0].text);
      const text = result.response.text();

      return res.json({ message: text });

    } catch (error) {
      console.error('Backend Gemini API error:', error);
      res.status(500).json({ message: "Internal server error." });
    }
  });

  return app;
}

module.exports = createApp;
