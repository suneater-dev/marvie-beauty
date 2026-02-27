/**
 * Local dev proxy for API routes.
 *
 * CRA automatically loads this file. It intercepts /api/chat and /api/booking
 * requests so you can test the chatbot locally with `npm start`.
 *
 * Reads OPENAI_API_KEY from .env.local
 * This file is NOT used in production (Vercel serverless handles it).
 */

module.exports = function (app) {
  // Parse JSON bodies
  const jsonParser = (req, res, next) => {
    if (req.headers['content-type']?.includes('application/json')) {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
        } catch {
          req.body = {};
        }
        next();
      });
    } else {
      next();
    }
  };

  // Chat endpoint
  app.post('/api/chat', jsonParser, async (req, res) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'sk-your-openai-api-key-here') {
      return res.status(500).json({ error: 'OPENAI_API_KEY not set in .env.local' });
    }

    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // Extract the SYSTEM_PROMPT string from api/chat.js
    const systemPrompt = require('fs').readFileSync(
      require('path').join(__dirname, '..', 'api', 'chat.js'),
      'utf8'
    );

    const match = systemPrompt.match(/const SYSTEM_PROMPT = `([\s\S]*?)`;/);
    const prompt = match ? match[1] : 'You are Marvie Beauty Clinic customer service assistant.';

    const apiMessages = [
      { role: 'system', content: prompt },
      ...messages.slice(-20).map((msg) => ({
        role: ['user', 'assistant'].includes(msg.role) ? msg.role : 'user',
        content: (msg.content || '').slice(0, 2000),
      })),
    ];

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: apiMessages,
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI error:', response.status, errorText);
        return res.status(500).json({ error: 'AI service error' });
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;

      if (!reply) {
        return res.status(500).json({ error: 'No reply from AI' });
      }

      res.json({ reply });
    } catch (error) {
      console.error('Chat proxy error:', error.message);
      res.status(500).json({ error: 'Failed to connect to AI service' });
    }
  });

  // Booking endpoint
  app.post('/api/booking', jsonParser, async (req, res) => {
    const {
      name, phone, treatment, treatment_en, treatment_id,
      date, notes, notes_en, notes_id, language,
    } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const timestamp = new Date().toLocaleString();

    console.log('\n=== NEW BOOKING REQUEST ===');
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Treatment: ${treatment || 'Not specified'}`);
    console.log(`Treatment (EN): ${treatment_en || '-'}`);
    console.log(`Treatment (ID): ${treatment_id || '-'}`);
    console.log(`Date: ${date || 'Not specified'}`);
    console.log(`Notes: ${notes || '-'}`);
    console.log(`Notes (EN): ${notes_en || '-'}`);
    console.log(`Notes (ID): ${notes_id || '-'}`);
    console.log(`Language: ${language || 'unknown'}`);
    console.log('===========================\n');

    res.json({
      success: true,
      message: 'Your booking request has been received! Our admin will contact you via WhatsApp to confirm your appointment.',
    });
  });
};
