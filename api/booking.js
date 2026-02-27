/**
 * Vercel Serverless Function - Booking API
 *
 * Receives booking data from the conversational AI flow and:
 * 1. POSTs to Google Sheets webhook (if configured)
 * 2. Logs to console as fallback
 *
 * Environment variable: GOOGLE_SHEETS_WEBHOOK_URL (optional)
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    phone,
    treatment,
    treatment_en,
    treatment_id,
    date,
    notes,
    notes_en,
    notes_id,
    language,
  } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Makassar' });

  // Log the booking (always works)
  console.log('=== NEW BOOKING REQUEST ===');
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
  console.log('===========================');

  // POST to Google Sheets webhook if configured (non-blocking)
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp,
          name,
          phone,
          treatment: treatment || '',
          treatment_en: treatment_en || '',
          treatment_id: treatment_id || '',
          date: date || '',
          notes: notes || '',
          notes_en: notes_en || '',
          notes_id: notes_id || '',
          language: language || '',
        }),
      });
      console.log('Booking sent to Google Sheets successfully');
    } catch (error) {
      console.error('Google Sheets webhook error (non-blocking):', error.message);
    }
  }

  return res.status(200).json({
    success: true,
    message:
      'Your booking request has been received! Our admin will contact you via WhatsApp to confirm your appointment.',
  });
}
