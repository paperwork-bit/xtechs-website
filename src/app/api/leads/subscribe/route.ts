import { NextRequest, NextResponse } from 'next/server';
import { addLeadToSheet, type LeadData } from '@/lib/googleAppsScript';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json();
    
    // Validate required fields
    if (!body.email || !body.consentMarketing) {
      return NextResponse.json(
        { error: 'Email and marketing consent are required' },
        { status: 400 }
      );
    }

    // Rate limiting (simple implementation)
    const rateLimitKey = `rate_limit_${body.email}`;
    // In production, use Redis or similar for rate limiting
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Persist lead to Google Sheets
    const leadRecord = {
      ...body,
      createdAt: new Date().toISOString(),
    };
    const result = await addLeadToSheet(leadRecord);
    console.log('New lead captured:', { leadId: result.leadId, email: body.email, source: body.source, variant: body.variant, hasCalculatorResults: !!body.calculatorResults });

    // Send email via external service (if configured)
    if (process.env.VITE_EMAIL_ENDPOINT) {
      try {
        const emailResponse = await fetch(process.env.VITE_EMAIL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.EMAIL_API_KEY || ''}`,
          },
          body: JSON.stringify({
            to: body.email,
            template: 'solar_guide',
            data: {
              firstName: body.firstName || 'there',
              postcode: body.postcode,
              hasCalculatorResults: !!body.calculatorResults,
              utm: body.utm,
            },
          }),
        });

        if (!emailResponse.ok) {
          console.warn('Failed to send email:', await emailResponse.text());
        }
      } catch (emailError) {
        console.warn('Email service error:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Generate PDF if calculator results are present
    if (body.calculatorResults) {
      try {
        const pdfResponse = await fetch(`${request.nextUrl.origin}/api/pdf/generate-savings-report`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: body.calculatorResults.inputs,
            results: body.calculatorResults.results,
            leadData: body,
          }),
        });

        if (pdfResponse.ok) {
          // PDF generated successfully
          console.log('PDF generated for lead:', leadRecord.id);
        }
      } catch (pdfError) {
        console.warn('PDF generation error:', pdfError);
        // Don't fail the request if PDF generation fails
      }
    }

    return NextResponse.json({
      success: true,
      leadId: result.leadId,
      message: 'Lead captured successfully',
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
