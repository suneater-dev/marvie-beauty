# Google Sheets Booking Webhook — Setup Guide

This guide connects the AI chatbot's booking flow to your Google Sheet so every confirmed booking appears as a new row.

**Target Sheet:** https://docs.google.com/spreadsheets/d/13R7Au5gcg2yWHXxlX7qyPnanlGGc-iYEyyrg4-GYBFI/edit

---

## Step 1: Open Apps Script Editor

1. Open the Google Sheet above
2. Go to **Extensions → Apps Script**
3. This opens the Apps Script editor in a new tab

## Step 2: Paste the Webhook Code

1. Delete any existing code in `Code.gs` (the default file)
2. Open `booking-webhook.js` from this folder
3. Copy the **entire contents** and paste into `Code.gs`
4. Click **Save** (Ctrl+S / Cmd+S)

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" → choose **Web app**
3. Fill in:
   - **Description:** `Booking webhook v1`
   - **Execute as:** `Me` (your Google account)
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. If prompted, click **Authorize access** and follow the Google consent screen
   - You may see "Google hasn't verified this app" — click **Advanced → Go to (project name)**
   - Click **Allow**
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`)

## Step 4: Set Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add a new variable:
   - **Key:** `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value:** *(paste the Web app URL from Step 3)*
   - **Environments:** Production, Preview, Development
4. Click **Save**
5. **Redeploy** the project for the variable to take effect

## Step 5: Test the Integration

1. Open your site and use the chatbot to complete a booking
2. Check the Google Sheet — a new row should appear in the **Bookings** tab
3. Check Vercel function logs for `Google Sheets webhook response: 200` confirmation

---

## Sheet Columns

The webhook automatically creates a "Bookings" sheet with these columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the booking was submitted (Asia/Makassar timezone) |
| Name | Customer name |
| Phone | WhatsApp number |
| Email | Email address (may be empty) |
| Treatment | Treatment name (original language) |
| Treatment (EN) | English translation |
| Treatment (ID) | Indonesian translation |
| Date | Preferred date/time |
| Notes | Additional notes (original language) |
| Notes (EN) | English translation |
| Notes (ID) | Indonesian translation |
| Language | Detected conversation language (en/id/ja/ko/etc) |
| Status | Defaults to "New" — use this for admin tracking |

### Suggested Status Values
- **New** — Just submitted (default)
- **Contacted** — Admin has reached out via WhatsApp
- **Confirmed** — Appointment confirmed
- **Completed** — Patient visited
- **Cancelled** — Booking cancelled

---

## Updating the Webhook

If you edit `booking-webhook.js` and need to update:

1. Open **Extensions → Apps Script** from the sheet
2. Paste the updated code
3. Click **Deploy → Manage deployments**
4. Click the pencil icon on the active deployment
5. Change **Version** to **New version**
6. Click **Deploy**

> The URL stays the same — no need to update the Vercel env var.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| No rows appearing | Check that `GOOGLE_SHEETS_WEBHOOK_URL` is set in Vercel and the project is redeployed |
| 403 error in Vercel logs | Re-deploy the Apps Script with "Anyone" access |
| "Bookings" sheet not created | The sheet is auto-created on the first POST — trigger a test booking |
| Authorization error | Re-authorize: Apps Script editor → Run → `doGet` → follow auth prompts |
