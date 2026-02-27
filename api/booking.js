/**
 * Vercel Serverless Function - Booking API
 *
 * Receives booking form data and sends email notification to admin.
 * Environment variable required: ADMIN_EMAIL
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

  const { name, phone, treatment, date, notes } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Makassar' });

  // Log the booking (always works, even without email service)
  console.log('=== NEW BOOKING REQUEST ===');
  console.log(`Name: ${name}`);
  console.log(`Phone: ${phone}`);
  console.log(`Treatment: ${treatment || 'Not specified'}`);
  console.log(`Date: ${date || 'Not specified'}`);
  console.log(`Notes: ${notes || '-'}`);
  console.log(`Timestamp: ${timestamp}`);
  console.log('===========================');

  // Return success - admin will see bookings in Vercel logs
  // For email notifications, integrate Resend/SendGrid later
  return res.status(200).json({
    success: true,
    message:
      'Your booking request has been received! Our admin will contact you via WhatsApp to confirm your appointment.',
  });
}
