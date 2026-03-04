/**
 * Google Apps Script — Booking Webhook
 *
 * Receives POST requests from api/booking.js and appends rows
 * to the "Bookings" sheet in this spreadsheet.
 *
 * Deploy as: Web App → Execute as Me → Anyone can access
 * Then set the deployment URL as GOOGLE_SHEETS_WEBHOOK_URL in Vercel.
 */

// ---- Configuration ----
var SHEET_NAME = 'Bookings';

// Column headers (written automatically on first run)
var HEADERS = [
  'Timestamp',
  'Name',
  'Phone',
  'Email',
  'Treatment',
  'Treatment (EN)',
  'Treatment (ID)',
  'Date',
  'Notes',
  'Notes (EN)',
  'Notes (ID)',
  'Language',
  'Status',
];

// ---- Helpers ----

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Write headers in row 1
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    // Bold + freeze header row
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    // Auto-resize columns
    for (var i = 1; i <= HEADERS.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }

  return sheet;
}

// ---- Web App Entry Point ----

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = getOrCreateSheet();

    var row = [
      data.timestamp || new Date().toLocaleString('en-US', { timeZone: 'Asia/Makassar' }),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.treatment || '',
      data.treatment_en || '',
      data.treatment_id || '',
      data.date || '',
      data.notes || '',
      data.notes_en || '',
      data.notes_id || '',
      data.language || '',
      'New', // Default status for admin tracking
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Booking saved' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ---- GET handler (health check) ----

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'Marvie Beauty booking webhook is running' })
  ).setMimeType(ContentService.MimeType.JSON);
}
