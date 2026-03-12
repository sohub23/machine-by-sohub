<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Load environment variables
$envFile = __DIR__ . '/../../.env';
$env = [];
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($key, $value) = explode('=', $line, 2);
        $env[trim($key)] = trim($value);
    }
}

$adminEmail = $env['ADMIN_EMAIL'] ?? 'hello@sohub.com.bd';
$smtpHost = $env['SMTP_HOST'] ?? 'smtp.gmail.com';
$smtpPort = $env['SMTP_PORT'] ?? 587;
$smtpUser = $env['SMTP_USER'] ?? '';
$smtpPass = $env['SMTP_PASS'] ?? '';

// Generate PDF
require_once __DIR__ . '/fpdf.php';

class PDF extends FPDF {
    function Header() {
        $this->SetFillColor(246, 245, 242);
        $this->Rect(0, 0, 210, 297, 'F');
    }
    
    function Footer() {
        $this->SetY(-15);
        $this->SetFont('Arial', '', 8);
        $this->SetTextColor(51, 51, 51);
        
        // Calculate position for right alignment
        $logoWidth = 20;
        $spacing = 2; // Space between text and logo
        $textWidth = $this->GetStringWidth('Powered BY');
        $totalWidth = $textWidth + $spacing + $logoWidth;
        $startX = 210 - 10 - $totalWidth; // Page width - right margin - total width
        
        // Position and add text
        $this->SetX($startX);
        $this->Cell($textWidth, 5, 'Powered BY', 0, 0, 'L');
        
        // Add SOHUB logo right after text with spacing
        $logoPath = __DIR__ . '/../../public/logo/sohub.png';
        if (file_exists($logoPath)) {
            $this->Image($logoPath, $this->GetX() + $spacing, $this->GetY() - 1, $logoWidth);
        }
    }
}

$pdf = new PDF();
$pdf->AddPage();
$pdf->SetAutoPageBreak(true, 25);

// Logo at top left
$logoPath = __DIR__ . '/../../public/logo/machine-by-sohub.png';
if (file_exists($logoPath)) {
    $pdf->Image($logoPath, 10, 15, 45);
}

$pdf->SetY(35);

// Quotation Number
$pdf->SetFont('Arial', '', 14);
$pdf->SetTextColor(255, 84, 84);
$pdf->Cell(0, 8, 'Quotation No: ' . date('Ymd') . rand(100, 999), 0, 1);
$pdf->Ln(5);

// Customer Details and Date
$pdf->SetFont('Arial', '', 11);
$pdf->SetTextColor(34, 34, 34);
$pdf->Cell(100, 6, 'Customer Details', 0, 0);
$pdf->SetFont('Arial', '', 11);
$pdf->Cell(0, 6, 'Date: ' . date('d.m.Y'), 0, 1, 'R');
$pdf->Ln(3);

$pdf->SetFont('Arial', '', 9);
$pdf->SetTextColor(68, 68, 68);
$pdf->Cell(0, 5, 'Name: ' . ($data['name'] ?? 'N/A'), 0, 1);
if (!empty($data['company'])) {
    $pdf->Cell(0, 5, 'Company: ' . $data['company'], 0, 1);
}
$pdf->Cell(0, 5, 'Email: ' . ($data['email'] ?? 'N/A') . ' | Phone: ' . ($data['phone'] ?? 'N/A'), 0, 1);
$pdf->Cell(0, 5, 'Location: ' . ($data['location'] ?? 'N/A'), 0, 1);
$pdf->Ln(8);

// Items Table Header
$pdf->SetFont('Arial', '', 11);
$pdf->SetTextColor(34, 34, 34);
$pdf->Cell(90, 6, 'Particulars', 0, 0);
$pdf->Cell(30, 6, 'Qty.', 0, 0, 'C');
$pdf->Cell(35, 6, 'Unit Price', 0, 0, 'C');
$pdf->Cell(35, 6, 'Total', 0, 1, 'R');

// Dotted line
$pdf->SetDrawColor(34, 34, 34);
$pdf->SetLineWidth(0.5);
$pdf->Line(10, $pdf->GetY(), 200, $pdf->GetY());
$pdf->Ln(3);

// Items
$pdf->SetFont('Arial', '', 9);
$pdf->SetTextColor(51, 51, 51);

$machineType = $data['machineType'] === 'imported' ? 'Imported' : 'Local Build';
$basePrice = $data['machineType'] === 'imported' ? 340000 : 250000;
$qty = $data['quantity'] ?? 1;

$pdf->Cell(90, 6, 'Snack Vending Machine (' . $machineType . ')', 0, 0);
$pdf->Cell(30, 6, $qty, 0, 0, 'C');
$pdf->Cell(35, 6, number_format($basePrice, 2), 0, 0, 'C');
$pdf->Cell(35, 6, number_format($basePrice * $qty, 2), 0, 1, 'R');

// Add-ons
if (!empty($data['addOns']) && is_array($data['addOns'])) {
    $addOnPrices = [
        'Built-in Chiller Unit' => 40000,
        'Touchscreen Display Upgrade' => 18000,
        'POS Payment Module (EBL)' => 10000,
        'Cashless Payment Gateway Integration' => 'TBD',
        'Inventory Management Service' => 'TBD',
        'Custom Branding Wrap' => 12000
    ];
    
    foreach ($data['addOns'] as $addon) {
        $addonName = is_array($addon) ? $addon['name'] : $addon;
        $addonPrice = $addOnPrices[$addonName] ?? 0;
        
        if ($addonPrice === 'TBD') {
            $pdf->Cell(90, 6, '+ ' . $addonName, 0, 0);
            $pdf->Cell(30, 6, $qty, 0, 0, 'C');
            $pdf->Cell(35, 6, 'TBD', 0, 0, 'C');
            $pdf->Cell(35, 6, 'TBD', 0, 1, 'R');
        } elseif ($addonPrice > 0) {
            $pdf->Cell(90, 6, '+ ' . $addonName, 0, 0);
            $pdf->Cell(30, 6, $qty, 0, 0, 'C');
            $pdf->Cell(35, 6, number_format($addonPrice, 2), 0, 0, 'C');
            $pdf->Cell(35, 6, number_format($addonPrice * $qty, 2), 0, 1, 'R');
        }
    }
}

$pdf->Ln(8);

// Subtotal section
$pdf->SetX(125);
$pdf->SetDrawColor(34, 34, 34);
$pdf->Line(125, $pdf->GetY(), 200, $pdf->GetY());
$pdf->Ln(2);

$pdf->SetFont('Arial', '', 11);
$pdf->SetX(125);
$pdf->Cell(40, 6, 'Subtotal', 0, 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(35, 6, number_format($data['totalPrice'] ?? 0, 2), 0, 1, 'R');

$pdf->Ln(5);

// Notes
$pdf->SetFont('Arial', '', 8);
$pdf->SetTextColor(255, 84, 84);
$pdf->Cell(0, 4, '* Above mentioned price is excluding VAT & Tax', 0, 1);
$pdf->Cell(0, 4, '** Backend Platform: 5000/month backend per machine - To Be Discussed', 0, 1);

$pdf->Ln(8);

// Terms & Conditions
$pdf->SetFont('Arial', '', 11);
$pdf->SetTextColor(34, 34, 34);
$pdf->Cell(0, 6, 'Terms & Conditions', 0, 1);
$pdf->SetFont('Arial', '', 8);
$pdf->SetTextColor(68, 68, 68);
$pdf->Cell(5, 4, '', 0, 0);
$pdf->Cell(0, 4, 'This quotation is valid for 30 days from the date of issue', 0, 1);
$pdf->Cell(5, 4, '', 0, 0);
$pdf->Cell(0, 4, 'Payment terms: 50% advance, 50% before delivery', 0, 1);
$pdf->Cell(5, 4, '', 0, 0);
$pdf->Cell(0, 4, 'Delivery timeline: 30-45 working days after order confirmation', 0, 1);
$pdf->Cell(5, 4, '', 0, 0);
$pdf->Cell(0, 4, 'Installation, training, and 1-year warranty included', 0, 1);
$pdf->Cell(5, 4, '', 0, 0);
$pdf->Cell(0, 4, 'Backend platform subscription starts from deployment date', 0, 1);

$pdf->Ln(10);

// Footer
$pdf->SetFont('Arial', '', 8);
$pdf->SetTextColor(51, 51, 51);
$pdf->Cell(0, 4, 'For Support, Email: hello@sohub.com.bd | Phone: +880 1922-036882', 0, 1, 'C');
$pdf->Cell(0, 4, 'Machine by SOHUB - Building reliable machine infrastructure for Bangladesh', 0, 1, 'C');

$pdfContent = $pdf->Output('S');
$pdfBase64 = base64_encode($pdfContent);

// Send Email via SMTP
function sendEmail($to, $subject, $body, $pdfBase64, $smtpHost, $smtpPort, $smtpUser, $smtpPass) {
    $boundary = md5(time());
    
    $headers = "From: SOHUB <$smtpUser>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    
    $message = "--$boundary\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= $body . "\r\n\r\n";
    
    $message .= "--$boundary\r\n";
    $message .= "Content-Type: application/pdf; name=\"quotation.pdf\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= "Content-Disposition: attachment; filename=\"quotation.pdf\"\r\n\r\n";
    $message .= chunk_split($pdfBase64) . "\r\n";
    $message .= "--$boundary--";
    
    $socket = @fsockopen($smtpHost, $smtpPort, $errno, $errstr, 30);
    if (!$socket) return false;
    
    fgets($socket);
    fputs($socket, "EHLO $smtpHost\r\n");
    fgets($socket);
    
    fputs($socket, "STARTTLS\r\n");
    while($line = fgets($socket)) {
        if(substr($line,0,3) == '220') break;
    }
    
    stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT);
    
    fputs($socket, "EHLO $smtpHost\r\n");
    fgets($socket);
    
    fputs($socket, "AUTH LOGIN\r\n");
    while($line = fgets($socket)) {
        if(substr($line,0,3) == '334') break;
    }
    
    fputs($socket, base64_encode($smtpUser) . "\r\n");
    while($line = fgets($socket)) {
        if(substr($line,0,3) == '334') break;
    }
    
    fputs($socket, base64_encode($smtpPass) . "\r\n");
    $response = fgets($socket);
    
    if (strpos($response, '235') === false) {
        fclose($socket);
        return false;
    }
    
    fputs($socket, "MAIL FROM: <$smtpUser>\r\n");
    fgets($socket);
    fputs($socket, "RCPT TO: <$to>\r\n");
    fgets($socket);
    fputs($socket, "DATA\r\n");
    fgets($socket);
    
    fputs($socket, "Subject: $subject\r\n");
    fputs($socket, $headers);
    fputs($socket, "\r\n");
    fputs($socket, $message);
    fputs($socket, "\r\n.\r\n");
    fgets($socket);
    
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    return true;
}

$emailBody = "
<html>
<body style='font-family: Arial, sans-serif; color: #333;'>
    <h2 style='color: #ff5454;'>New Vending Machine Order Request</h2>
    <p><strong>Customer:</strong> {$data['name']}</p>
    <p><strong>Phone:</strong> {$data['phone']}</p>
    <p><strong>Email:</strong> " . ($data['email'] ?? 'N/A') . "</p>
    <p><strong>Location:</strong> {$data['location']}</p>
    <p><strong>Machine Type:</strong> $machineType</p>
    <p><strong>Quantity:</strong> {$data['quantity']}</p>
    <p><strong>Total:</strong> " . number_format($data['totalPrice'], 0) . " BDT</p>
    <p>Please find the detailed quotation in the attached PDF.</p>
</body>
</html>
";

$GLOBALS['adminEmail'] = $adminEmail;

// Send to admin
$adminSent = sendEmail($adminEmail, 'New Vending Machine Order', $emailBody, $pdfBase64, $smtpHost, $smtpPort, $smtpUser, $smtpPass);

// Send to customer if email provided
$customerSent = false;
if (!empty($data['email'])) {
    $customerEmailBody = "
<html>
<body style='font-family: Arial, sans-serif; color: #333;'>
    <h2 style='color: #ff5454;'>Thank you for your order request!</h2>
    <p>Dear {$data['name']},</p>
    <p>We have received your vending machine order request. Please find the quotation attached.</p>
    <p><strong>Order Summary:</strong></p>
    <ul>
        <li>Machine Type: $machineType</li>
        <li>Quantity: {$data['quantity']}</li>
        <li>Total: " . number_format($data['totalPrice'], 0) . " BDT</li>
    </ul>
    <p>Our team will contact you within 1 business day to confirm details and payment.</p>
    <p>Best regards,<br>SOHUB Team</p>
</body>
</html>
";
    $customerSent = sendEmail($data['email'], 'Your Vending Machine Quotation - SOHUB', $customerEmailBody, $pdfBase64, $smtpHost, $smtpPort, $smtpUser, $smtpPass);
}

if ($adminSent) {
    echo json_encode(['success' => true, 'message' => 'Order submitted successfully', 'customerEmail' => $customerSent]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
