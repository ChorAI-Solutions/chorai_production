<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../../vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

// --- CORS: only allow the portfolio origin(s) ---
$allowedOrigins = array_filter(array_map('trim', explode(',', getenv('CONTACT_ALLOWED_ORIGINS') ?: '')));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// --- Read JSON body ---
$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

// --- Honeypot (optional anti-spam field; bots fill it, humans don't) ---
if (trim((string) ($data['website'] ?? '')) !== '') {
    // Pretend success so bots don't learn anything.
    echo json_encode(['ok' => true]);
    exit;
}

// --- Server-side validation (mirror of the Angular validators) ---
$errors = [];
if (mb_strlen($name) < 5) {
    $errors['name'] = 'too_short';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/\.[a-zA-Z]{2,}$/', $email)) {
    $errors['email'] = 'invalid';
}
if (mb_strlen($message) < 10) {
    $errors['message'] = 'too_short';
}
if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'validation', 'fields' => $errors]);
    exit;
}

// --- Send via SMTP ---
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = getenv('CONTACT_SMTP_HOST') ?: 'smtp.gmail.com';
    $mail->Port = (int) (getenv('CONTACT_SMTP_PORT') ?: 587);
    $mail->SMTPAuth = true;
    $mail->Username = getenv('CONTACT_SMTP_USER') ?: '';
    $mail->Password = getenv('CONTACT_SMTP_PASS') ?: '';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;

    // From must be the authenticated mailbox (Gmail rewrites anything else).
    $fromAddress = getenv('CONTACT_FROM') ?: ($mail->Username);
    $toAddress = getenv('CONTACT_TO') ?: $fromAddress;

    $mail->setFrom($fromAddress, 'Portfolio Kontaktformular');
    $mail->addAddress($toAddress);
    // Let "Reply" go straight to the person who wrote in.
    if ($email !== '') {
        $mail->addReplyTo($email, $name !== '' ? $name : $email);
    }

    $mail->Subject = 'Kontakt';
    $mail->Body =
        "Neue Kontaktanfrage über das Portfolio-Formular:\n\n"
        . "Name:    {$name}\n"
        . "E-Mail:  {$email}\n\n"
        . "Nachricht:\n{$message}\n";

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (Exception $e) {
    http_response_code(502);
    // ErrorInfo is safe to log server-side; don't leak details to the client.
    error_log('Contact mail failed: ' . $mail->ErrorInfo);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
