<?php
require_once(__DIR__ . '/TCPDF/tcpdf.php');

function generateOrderPDF($name, $company, $phone, $email, $location, $notes, $machineType, $quantity, $addOns, $totalPrice, $unitPrice) {
    $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
    
    $pdf->SetCreator('SOHUB');
    $pdf->SetAuthor('SOHUB - Solution Hub Technologies');
    $pdf->SetTitle('Machine Quotation');
    $pdf->SetSubject('Snack Vending Machine Order');
    
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    $pdf->SetMargins(15, 15, 15);
    $pdf->SetAutoPageBreak(TRUE, 15);
    $pdf->AddPage();
    
    $pdf->SetFont('helvetica', 'B', 20);
    $pdf->SetTextColor(249, 115, 22);
    $pdf->Cell(0, 10, 'QUOTATION', 0, 1, 'C');
    
    $pdf->SetFont('helvetica', '', 10);
    $pdf->SetTextColor(100, 100, 100);
    $pdf->Cell(0, 5, 'SOHUB - Solution Hub Technologies', 0, 1, 'C');
    $pdf->Cell(0, 5, 'Machine by SOHUB', 0, 1, 'C');
    $pdf->Ln(5);
    
    $pdf->SetFont('helvetica', '', 9);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->Cell(40, 6, 'Date:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, date('d M Y'), 0, 1);
    
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(40, 6, 'Quotation ID:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, 'SOHUB-' . date('Ymd') . '-' . substr(md5($phone), 0, 6), 0, 1);
    $pdf->Ln(5);
    
    $pdf->SetFillColor(249, 115, 22);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFont('helvetica', 'B', 11);
    $pdf->Cell(0, 8, 'CUSTOMER DETAILS', 0, 1, 'L', true);
    
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(40, 6, 'Name:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, $name, 0, 1);
    
    if ($company) {
        $pdf->SetFont('helvetica', '', 9);
        $pdf->Cell(40, 6, 'Company:', 0, 0);
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->Cell(0, 6, $company, 0, 1);
    }
    
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(40, 6, 'Phone:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, $phone, 0, 1);
    
    if ($email) {
        $pdf->SetFont('helvetica', '', 9);
        $pdf->Cell(40, 6, 'Email:', 0, 0);
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->Cell(0, 6, $email, 0, 1);
    }
    
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(40, 6, 'Location:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, $location, 0, 1);
    $pdf->Ln(5);
    
    $pdf->SetFillColor(249, 115, 22);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFont('helvetica', 'B', 11);
    $pdf->Cell(0, 8, 'ORDER SUMMARY', 0, 1, 'L', true);
    
    $pdf->SetFillColor(245, 245, 245);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(100, 7, 'Item', 1, 0, 'L', true);
    $pdf->Cell(30, 7, 'Quantity', 1, 0, 'C', true);
    $pdf->Cell(50, 7, 'Price (BDT)', 1, 1, 'R', true);
    
    $basePrice = $machineType === 'imported' ? 450000 : 380000;
    $machineLabel = $machineType === 'imported' ? 'Snack Vending Machine (Imported)' : 'Snack Vending Machine (Local Build)';
    
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(100, 6, $machineLabel, 1, 0, 'L');
    $pdf->Cell(30, 6, $quantity, 1, 0, 'C');
    $pdf->Cell(50, 6, number_format($basePrice * $quantity), 1, 1, 'R');
    
    foreach ($addOns as $addon) {
        $addonPrice = getAddonPrice($addon, $machineType);
        if ($addonPrice > 0) {
            $pdf->Cell(100, 6, '+ ' . $addon, 1, 0, 'L');
            $pdf->Cell(30, 6, $quantity, 1, 0, 'C');
            $pdf->Cell(50, 6, number_format($addonPrice * $quantity), 1, 1, 'R');
        }
    }
    
    $pdf->SetFont('helvetica', 'B', 10);
    $pdf->Cell(130, 8, 'TOTAL', 1, 0, 'R');
    $pdf->SetTextColor(249, 115, 22);
    $pdf->Cell(50, 8, number_format($totalPrice) . ' BDT', 1, 1, 'R');
    
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('helvetica', 'I', 8);
    $pdf->Cell(0, 5, '+ Backend Platform: ' . number_format(5000 * $quantity) . ' BDT/month per machine', 0, 1, 'R');
    $pdf->Ln(5);
    
    $pdf->SetFillColor(249, 115, 22);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFont('helvetica', 'B', 11);
    $pdf->Cell(0, 8, 'TERMS & CONDITIONS', 0, 1, 'L', true);
    
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('helvetica', '', 8);
    $pdf->MultiCell(0, 5, "• This quotation is valid for 30 days from the date of issue\n• Payment terms: 50% advance, 50% before delivery\n• Delivery timeline: 15-20 working days after order confirmation\n• Installation, training, and 1-year warranty included\n• Backend platform subscription starts from deployment date", 0, 'L');
    
    if ($notes) {
        $pdf->Ln(3);
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->Cell(0, 6, 'Additional Notes:', 0, 1);
        $pdf->SetFont('helvetica', '', 8);
        $pdf->MultiCell(0, 5, $notes, 0, 'L');
    }
    
    $pdf->Ln(10);
    $pdf->SetFont('helvetica', '', 7);
    $pdf->SetTextColor(100, 100, 100);
    $pdf->Cell(0, 4, 'SOHUB - Solution Hub Technologies', 0, 1, 'C');
    $pdf->Cell(0, 4, 'Email: hello@sohub.com.bd | Phone: +880 1922-036882', 0, 1, 'C');
    $pdf->Cell(0, 4, 'Machine by SOHUB - Building reliable machine infrastructure for Bangladesh', 0, 1, 'C');
    
    return $pdf->Output('', 'S');
}

function getAddonPrice($addonName, $machineType) {
    $prices = [
        'Built-in Chiller Unit' => 35000,
        'POS Payment Module' => 25000,
        'Touchscreen Display Upgrade' => 20000,
        'Advanced Telemetry Kit' => 15000,
        'Custom Branding Wrap' => 12000
    ];
    if ($machineType === 'local' && $addonName === 'Built-in Chiller Unit') return 0;
    return $prices[$addonName] ?? 0;
}
?>
