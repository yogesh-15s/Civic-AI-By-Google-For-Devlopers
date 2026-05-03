const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

function createApp() {
  const app = express();

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://generativelanguage.googleapis.com"],
      },
    },
  }));

  // CORS configuration — allow both www and non-www variants
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
  ].filter(Boolean);

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some(o => origin.startsWith(o.replace(/\/$/, '')))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
  }));

  // Body parsing with size limits
  app.use(express.json({ limit: '10kb' }));

  // Rate limiting — stricter on chat endpoint
  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests. Please try again after 15 minutes." }
  });

  const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many chat messages. Please slow down." }
  });

  app.use('/api/', globalLimiter);
  app.use('/api/chat', chatLimiter);

  // Google Gemini Setup — using latest recommended model
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

  // Google Gemini Safety Settings
  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ];

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

  // Schema Validation with Zod
  const ChatSchema = z.object({
    messages: z.array(z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().min(1).max(2000).trim()
    })).min(1).max(20),
    language: z.enum(['en', 'hi']).optional().default('en')
  });

  // Internal API Key Auth Middleware
  const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (process.env.INTERNAL_API_KEY && apiKey !== process.env.INTERNAL_API_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Health check
  app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'CivicAI Backend', poweredBy: 'Google Gemini' });
  });

  // Chat endpoint — uses Google Gemini with safety settings
  app.post('/api/chat', authMiddleware, async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        return res.status(503).json({
          message: "AI service is not configured. Please contact support."
        });
      }

      // Validate request body
      const validation = ChatSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid request payload",
          errors: validation.error.errors.map(e => ({ field: e.path.join('.'), issue: e.message }))
        });
      }

      const { messages, language } = validation.data;

      const langInstruction = language === 'hi'
        ? 'Please respond in Hindi (Devanagari script) as the user prefers Hindi.'
        : 'Please respond in English.';

      // Google Gemini — using gemini-1.5-flash with safety settings
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: `${SYSTEM_PROMPT}\n\n${langInstruction}`,
        safetySettings,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        }
      });

      const formattedHistory = messages.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const lastMessage = formattedHistory.pop();

      if (!lastMessage) {
        return res.status(400).json({ message: "No message to process." });
      }

      const chat = model.startChat({ history: formattedHistory });
      const result = await chat.sendMessage(lastMessage.parts[0].text);
      const text = result.response.text();

      return res.json({ message: text, model: 'gemini-1.5-flash', poweredBy: 'Google AI' });

    } catch (error) {
      // Don't leak internal error details
      console.error('Gemini API error:', error?.message || error);

      if (error?.message?.includes('SAFETY')) {
        return res.status(422).json({ message: "I cannot respond to that request. Please ask about election-related topics." });
      }

      res.status(500).json({ message: "AI service error", detail: error?.message || error });
    }
  });

  return app;
}

module.exports = createApp;
