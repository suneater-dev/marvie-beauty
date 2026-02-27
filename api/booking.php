<?php
/**
 * Booking API Endpoint for Marvie Beauty
 *
 * Receives booking form data and sends an email notification to admin.
 */

header('Content-Type: application/json; charset=UTF-8');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Load config
require_once __DIR__ . '/config.php';

// Parse request body
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request body']);
    exit;
}

// Validate required fields
$required = ['name', 'phone'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        exit;
    }
}

// Sanitize input
$name = htmlspecialchars(strip_tags(trim($input['name'])), ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars(strip_tags(trim($input['phone'])), ENT_QUOTES, 'UTF-8');
$treatment = htmlspecialchars(strip_tags(trim($input['treatment'] ?? 'Not specified')), ENT_QUOTES, 'UTF-8');
$date = htmlspecialchars(strip_tags(trim($input['date'] ?? 'Not specified')), ENT_QUOTES, 'UTF-8');
$notes = htmlspecialchars(strip_tags(trim($input['notes'] ?? '-')), ENT_QUOTES, 'UTF-8');
$timestamp = date('Y-m-d H:i:s');

// Build email content
$subject = "New Booking Request - Marvie Beauty Chatbot";

$htmlBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #475161; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #475161; }
        .value { color: #333; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Booking Request</h2>
            <p>From Marvie Beauty AI Chatbot</p>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Name:</span>
                <span class='value'>$name</span>
            </div>
            <div class='field'>
                <span class='label'>Phone/WhatsApp:</span>
                <span class='value'>$phone</span>
            </div>
            <div class='field'>
                <span class='label'>Treatment Interest:</span>
                <span class='value'>$treatment</span>
            </div>
            <div class='field'>
                <span class='label'>Preferred Date:</span>
                <span class='value'>$date</span>
            </div>
            <div class='field'>
                <span class='label'>Additional Notes:</span>
                <span class='value'>$notes</span>
            </div>
            <div class='field'>
                <span class='label'>Submitted At:</span>
                <span class='value'>$timestamp</span>
            </div>
        </div>
        <div class='footer'>
            <p>Please contact the customer via WhatsApp to confirm the appointment.</p>
        </div>
    </div>
</body>
</html>
";

// Send email
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Marvie Beauty Bot <noreply@marviebeauty.com>',
    'Reply-To: ' . ADMIN_EMAIL,
];

$sent = mail(ADMIN_EMAIL, $subject, $htmlBody, implode("\r\n", $headers));

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Booking request submitted successfully. Our admin will contact you via WhatsApp to confirm your appointment.'
    ]);
} else {
    // Log the error but still return success to user (they submitted the form)
    error_log("Failed to send booking email for: $name ($phone)");
    echo json_encode([
        'success' => true,
        'message' => 'Your booking request has been received. Our admin will contact you via WhatsApp to confirm your appointment.'
    ]);
}
