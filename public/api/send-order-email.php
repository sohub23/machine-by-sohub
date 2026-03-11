<?php
/**
 * SOHUB Machine Order Email Handler with PDF Generation
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS Headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Load Environment
function loadEnv($path) {
    if (!file_exists($path)) return false;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
    return true;
}

require_once __DIR__ . "/pdf-generator.php";

$envPath = __DIR__ . '/../../.env';
if (!loadEnv($envPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Configuration not found']);
    exit;
}

$smtp_host = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
$smtp_port = (int)($_ENV['SMTP_PORT'] ?? 587);
$smtp_user = $_ENV['SMTP_USER'] ?? '';
$smtp_pass = $_ENV['SMTP_PASS'] ?? '';
$admin_email = $_ENV['ADMIN_EMAIL'] ?? '';

if (empty($smtp_user) || empty($smtp_pass) || empty($admin_email)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'SMTP not configured']);
    exit;
}

// Parse Order Data
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? '';
$company = $data['company'] ?? '';
$phone = $data['phone'] ?? '';
$email = $data['email'] ?? '';
$location = $data['location'] ?? '';
$notes = $data['notes'] ?? '';
$machineType = $data['machineType'] ?? '';
$quantity = $data['quantity'] ?? 1;
$addOns = $data['addOns'] ?? [];
$totalPrice = $data['totalPrice'] ?? 0;
$unitPrice = $data['unitPrice'] ?? 0;

if (empty($name) || empty($phone) || empty($location)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Required fields missing']);
    exit;
}

// Generate PDF Content (Simple HTML to PDF approach)
$pdfContent = generateOrderPDF($name, $company, $phone, $email, $location, $notes, $machineType, $quantity, $addOns, $totalPrice, $unitPrice);

// Admin Email HTML - Simple notification
$adminEmailBody = "
<html>
<head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px}.header{background:#f97316;color:white;padding:20px;text-align:center;border-radius:8px}table{width:100%;margin:20px 0}td{padding:8px 0}.label{font-weight:600;color:#666;width:150px}</style></head>
<body>
<div class='header'><h2 style='margin:0'>🎉 New Machine Order Received!</h2></div>
<p>Hello Admin,</p>
<p>A new order request has been submitted. Please find the detailed quotation in the attached PDF.</p>
<table>
<tr><td class='label'>Customer Name:</td><td><strong>$name</strong></td></tr>
<tr><td class='label'>Phone:</td><td><strong>$phone</strong></td></tr>
<tr><td class='label'>Email:</td><td>" . ($email ?: 'Not provided') . "</td></tr>
<tr><td class='label'>Location:</td><td>$location</td></tr>
<tr><td class='label'>Total Amount:</td><td><strong style='color:#f97316;font-size:18px'>" . number_format($totalPrice) . " BDT</strong></td></tr>
</table>
<p><strong>📎 Full quotation details are attached as PDF.</strong></p>
<p style='color:#666;font-size:12px;margin-top:30px'>Order received at: " . date('d M Y, h:i A') . "</p>
</body>
</html>
";

// Customer Email HTML - Simple thank you
$customerEmailBody = "
<html>
<head><style>body{font-family:Arial,sans-serif;line-height:1.8;color:#333;padding:20px}.header{background:#f97316;color:white;padding:30px;text-align:center;border-radius:8px}.box{background:#f9f9f9;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #f97316}</style></head>
<body>
<div class='header'><h1 style='margin:0'>Thank You for Your Order! 🎉</h1></div>
<p>Dear <strong>$name</strong>,</p>
<p>Thank you for your interest in <strong>SOHUB Snack Vending Machine</strong>. We have received your order request and are excited to work with you!</p>
<div class='box'>
<p style='margin:0;font-size:16px'><strong>📋 Your detailed quotation is attached as PDF.</strong></p>
</div>
<h3 style='color:#f97316'>What Happens Next?</h3>
<ul style='line-height:2'>
<li>✅ Our team will review your order within <strong>1 business day</strong></li>
<li>📞 We will contact you at <strong>$phone</strong> to confirm details</li>
<li>💳 Payment and delivery arrangements will be discussed</li>
<li>🚚 Installation and training will be scheduled</li>
</ul>
<p><strong>Need immediate assistance?</strong><br>
📱 WhatsApp: <a href='https://wa.me/8801922036882' style='color:#f97316'>+880 1922-036882</a><br>
📧 Email: hello@sohub.com.bd</p>
<p style='margin-top:40px'>Best regards,<br><strong style='color:#f97316'>SOHUB Team</strong><br>Machine by SOHUB</p>
</body>
</html>
";

try {
    // Send to Admin
    sendEmail($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $admin_email, "New Machine Order from $name", $adminEmailBody, $pdfContent, 'SOHUB Admin');
    
    // Send to Customer (if email provided)
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendEmail($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $email, "Your SOHUB Machine Order Confirmation", $customerEmailBody, $pdfContent, $name);
    }
    
    echo json_encode(['success' => true, 'message' => 'Order submitted successfully']);
    
} catch (Exception $e) {
    http_response_code(500);
    error_log("Order Email Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}

function sendEmail($host, $port, $user, $pass, $to, $subject, $body, $pdfContent, $toName) {
    $socket = stream_socket_client("tcp://$host:$port", $errno, $errstr, 15);
    if (!$socket) throw new Exception("Connection failed: $errstr");
    
    fgets($socket, 515);
    fputs($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n");
    do { $response = fgets($socket, 515); } while (substr($response, 3, 1) === '-');
    
    fputs($socket, "STARTTLS\r\n");
    fgets($socket, 515);
    stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
    
    fputs($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n");
    do { $response = fgets($socket, 515); } while (substr($response, 3, 1) === '-');
    
    fputs($socket, "AUTH LOGIN\r\n");
    fgets($socket, 515);
    fputs($socket, base64_encode($user) . "\r\n");
    fgets($socket, 515);
    fputs($socket, base64_encode($pass) . "\r\n");
    fgets($socket, 515);
    
    fputs($socket, "MAIL FROM: <$user>\r\n");
    fgets($socket, 515);
    fputs($socket, "RCPT TO: <$to>\r\n");
    fgets($socket, 515);
    fputs($socket, "DATA\r\n");
    fgets($socket, 515);
    
    $boundary = md5(time());
    $email = "From: SOHUB Machine <$user>\r\n";
    $email .= "To: $toName <$to>\r\n";
    $email .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $email .= "MIME-Version: 1.0\r\n";
    $email .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n\r\n";
    
    // HTML body part
    $email .= "--$boundary\r\n";
    $email .= "Content-Type: text/html; charset=UTF-8\r\n";
    $email .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $email .= $body . "\r\n\r\n";
    
    // Quotation attachment as PDF
    $email .= "--$boundary\r\n";
    $email .= "Content-Type: application/pdf; name=\"SOHUB-Quotation-" . date('Ymd') . ".pdf\"\r\n";
    $email .= "Content-Transfer-Encoding: base64\r\n";
    $email .= "Content-Disposition: attachment; filename=\"SOHUB-Quotation-" . date('Ymd') . ".pdf\"\r\n\r\n";
    $email .= chunk_split(base64_encode($pdfContent)) . "\r\n";
    $email .= "--$boundary--\r\n";
    $email .= ".\r\n";
    
    fputs($socket, $email);
    fgets($socket, 515);
    fputs($socket, "QUIT\r\n");
    fclose($socket);
}
?>
