require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
  res.send('CivicAI Backend is running!');
});

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

app.post('/api/chat', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.json({
        message: "⚠️ Gemini API key not configured on server. Please add GEMINI_API_KEY to your backend .env file.\n\nDemo mode: I'm CivicAI! To vote in India, register at voter.eci.gov.in!"
      });
    }

    const { messages, language } = req.body;

    const langInstruction = language === 'hi'
      ? 'Please respond in Hindi (Devanagari script) as the user prefers Hindi.'
      : 'Please respond in English.';

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `${SYSTEM_PROMPT}\n\n${langInstruction}`
    });

    const formattedHistory = messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const lastMessage = formattedHistory.pop();
    
    if (!lastMessage) {
      return res.status(400).json({ message: "No message found." });
    }

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

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
