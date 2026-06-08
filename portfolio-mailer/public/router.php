<?php

// Router for the PHP built-in server.
// Any /api/contact request (with or without .php) is handled by the mailer.
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

if (preg_match('#^/api/contact(\.php)?/?$#', $path)) {
    require __DIR__ . '/api/contact.php';
    return true;
}

http_response_code(404);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['ok' => false, 'error' => 'not_found']);
return true;
