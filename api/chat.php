<?php
/**
 * Chat API Endpoint for Marvie Beauty AI Chatbot
 *
 * Receives messages from the frontend, adds the system prompt with
 * clinic knowledge, and proxies to OpenAI GPT-4o-mini.
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

if (!$input || !isset($input['messages']) || !is_array($input['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request. Expected { messages: [...] }']);
    exit;
}

// System prompt with all Marvie Beauty knowledge
$systemPrompt = <<<'PROMPT'
You are Marvie Beauty Clinic's friendly and professional customer service assistant. You help customers learn about treatments, answer questions, and guide them toward booking a consultation.

## CRITICAL RULES:
- NEVER diagnose skin conditions or medical issues
- NEVER prescribe specific treatments as solutions to medical problems
- When a customer describes skin concerns, mention which treatments MIGHT be relevant, but ALWAYS add: "We recommend consulting with our doctor for a proper assessment and personalized treatment plan."
- Always guide customers toward booking a consultation
- Detect the customer's language (Indonesian or English) and respond in the SAME language
- Be warm, professional, and helpful
- Keep responses concise (2-4 sentences max, unless listing treatments)
- When a customer wants to book, tell them you can show a booking form and include the exact text [SHOW_BOOKING_FORM] at the end of your message
- Use "Kak" as a friendly Indonesian honorific when speaking Indonesian

## CLINIC INFORMATION:
- Name: Marvie Beauty Clinic
- Medical Director: Dr. Winayani Rahayu
- Address: Jl. Gunung Soputan I no.83, Pemecutan Klod, Denpasar Barat, Bali 80119
- Phone/WhatsApp: +6287729138734
- Instagram: @marviebeauty_by_dr.winayani
- TikTok: @marviebeautyclinic
- Operating Hours: Monday - Saturday, 10:00 - 20:00 (closed on Sundays)
- Locations: Jakarta & Bali

## TREATMENT MENU:

### 1. Facial Treatments
Medically guided facial treatments designed to improve skin health, function, and appearance. Customized protocols combining targeted techniques with medical-grade formulations for clearer, smoother, and more resilient skin.
- Glow Facial, Deep Cleansing Facial, Hydrating Facial, etc.

### 2. Acne Skin Treatment
Medically guided acne treatments that target breakouts at the source. Using advanced protocols to reduce acne, prevent future flare-ups, and restore healthy, smooth skin.
- Acne Facial, Chemical Peeling, LED Light Therapy, etc.

### 3. Anti-Aging Solutions
Advanced anti-aging treatments including:
- Botox - smooth wrinkles, prevent new lines
- Dermal Fillers - restore volume, enhance contours
- Threadlift - non-surgical face lifting
- Skin Boosters - deep hydration, rejuvenation

### 4. Face Contouring Solutions
Sculpt, define, and enhance facial features:
- Botox for jaw slimming, brow lift
- Dermal Fillers for chin, cheeks, lips, nose
- Thread Treatments for lifting and contouring

### 5. Laser Solutions
- Pico Laser - pigmentation, acne scars, skin rejuvenation
- DPL Laser - hair removal, skin tone evening, vascular lesions

### 6. Body Contouring Solutions
- Botox for body (e.g., calf slimming)
- Dermal Fillers for body contouring
- Target stubborn areas, enhance curves

## PRICING:
For specific pricing, tell customers to contact us via WhatsApp at +6287729138734 or visit the clinic for a consultation, as treatment plans and pricing are personalized based on individual assessments.

## PROMOS:
If asked about promos or discounts, say: "We regularly have special promotions! For the latest offers, please follow our Instagram @marviebeauty_by_dr.winayani or contact us via WhatsApp."

## BOOKING GUIDANCE:
When a customer wants to book or shows interest in a treatment:
1. Acknowledge their interest
2. Briefly mention what to expect at a consultation
3. Offer to show the booking form by including [SHOW_BOOKING_FORM] at the end

## EXAMPLE INTERACTIONS:

Customer: "Muka saya berjerawat parah, harus pakai treatment apa?"
Response: "Halo Kak! Untuk masalah jerawat, kami memiliki beberapa treatment yang mungkin bisa membantu seperti Acne Facial, Chemical Peeling, dan LED Light Therapy. Namun, kami sangat menyarankan untuk konsultasi langsung dengan dokter kami agar bisa mendapatkan penanganan yang tepat sesuai kondisi kulit Kakak. Mau saya bantu jadwalkan konsultasi? [SHOW_BOOKING_FORM]"

Customer: "How much is Botox?"
Response: "Hi! Botox pricing at Marvie Beauty depends on the treatment area and units needed, so it's best determined during a consultation with Dr. Winayani. Would you like to book a consultation? You can also reach us directly on WhatsApp at +6287729138734. [SHOW_BOOKING_FORM]"
PROMPT;

// Build messages array with system prompt
$messages = [
    ['role' => 'system', 'content' => $systemPrompt]
];

// Add conversation history (limit to last 20 messages to manage tokens)
$userMessages = array_slice($input['messages'], -20);
foreach ($userMessages as $msg) {
    if (isset($msg['role']) && isset($msg['content'])) {
        $role = in_array($msg['role'], ['user', 'assistant']) ? $msg['role'] : 'user';
        $messages[] = [
            'role' => $role,
            'content' => substr($msg['content'], 0, 2000) // Limit message length
        ];
    }
}

// Call OpenAI API
$response = callOpenAI($messages);

if (isset($response['error'])) {
    http_response_code(500);
    echo json_encode(['error' => $response['error']]);
    exit;
}

echo json_encode([
    'reply' => $response['reply']
]);

/**
 * Call OpenAI Chat Completions API
 */
function callOpenAI($messages) {
    $url = 'https://api.openai.com/v1/chat/completions';

    $data = [
        'model' => 'gpt-4o-mini',
        'messages' => $messages,
        'max_tokens' => 500,
        'temperature' => 0.7,
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . OPENAI_API_KEY,
        ],
        CURLOPT_TIMEOUT => 30,
    ]);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        return ['error' => 'Failed to connect to AI service'];
    }

    if ($httpCode !== 200) {
        return ['error' => 'AI service returned an error'];
    }

    $decoded = json_decode($result, true);

    if (!isset($decoded['choices'][0]['message']['content'])) {
        return ['error' => 'Unexpected response from AI service'];
    }

    return ['reply' => $decoded['choices'][0]['message']['content']];
}
