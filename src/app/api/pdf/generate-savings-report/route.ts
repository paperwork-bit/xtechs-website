import { NextRequest, NextResponse } from 'next/server';
import { generateAndUploadPDF } from '@/lib/googleDrive';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inputs, results, leadData } = body;

    // Generate PDF content (simplified - in production, use a proper PDF library)
    const pdfContent = generatePDFContent(inputs, results, leadData);
    
    // Generate filename
    const fileName = `xTechs-Solar-Savings-Report-${leadData?.firstName || 'Customer'}-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Upload to Google Drive
    const uploadResult = await generateAndUploadPDF(pdfContent, fileName, leadData);

    return NextResponse.json({
      success: true,
      message: 'PDF generated and uploaded successfully',
      fileId: uploadResult.fileId,
      fileName: uploadResult.fileName,
      webViewLink: uploadResult.webViewLink,
      downloadUrl: uploadResult.webContentLink,
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

function generatePDFContent(inputs: any, results: any, leadData: any): string {
  // This is a placeholder - in production, generate actual PDF content
  const content = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
  /Font <<
    /F1 5 0 R
  >>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
50 750 Td
(xTechs Solar Savings Report) Tj
0 -20 Td
(System Size: ${inputs.systemSizeKw} kW) Tj
0 -20 Td
(Total Rebates: $${results.totalRebates}) Tj
0 -20 Td
(Generated for: ${leadData?.firstName || 'Customer'}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000525 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
625
%%EOF
  `;
  
  return content;
}
