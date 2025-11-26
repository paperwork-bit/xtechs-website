import { NextRequest, NextResponse } from 'next/server';
import { 
  verifyCaptcha, 
  getClientIP, 
  getCORSHeaders, 
  isValidEmail, 
  sanitizeName,
  sanitizeMessage 
} from "@/lib/security";

export const runtime = 'edge';

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: getCORSHeaders(origin),
  });
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    const corsHeaders = getCORSHeaders(origin);
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.consentMarketing) {
      return NextResponse.json(
        { error: 'Email and marketing consent are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Verify CAPTCHA if provided
    if (body.captchaToken && !(await verifyCaptcha(body.captchaToken, request))) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers: corsHeaders }
      );
    }

    // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
    const db = (process.env.DB as any) || (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' }, 
        { status: 500, headers: corsHeaders }
      );
    }

    // Sanitize inputs
    const sanitizedName = body.firstName ? sanitizeName(body.firstName) : null;
    const sanitizedLastName = body.lastName ? sanitizeName(body.lastName) : null;
    const sanitizedPostcode = body.postcode ? sanitizeMessage(body.postcode, 10) : null;
    const sanitizedSuburb = body.suburb ? sanitizeMessage(body.suburb, 100) : null;

    // Generate unique ID for lead
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ip = getClientIP(request);

    // Prepare lead data - store calculator results as JSON string
    const calculatorResultsJson = body.calculatorResults ? JSON.stringify(body.calculatorResults) : null;

    // Insert lead into D1 database (using leads table)
    // Note: We're storing additional fields in the message field as JSON for now
    // You may want to add more columns to the leads table for UTM parameters, etc.
    const leadData = {
      firstName: body.firstName || null,
      lastName: body.lastName || null,
      postcode: body.postcode || null,
      suburb: body.suburb || null,
      consentMarketing: body.consentMarketing || false,
      consentAnalytics: body.consentAnalytics || false,
      utm: body.utm || null,
      source: body.source || null,
      variant: body.variant || null,
      calculatorResults: calculatorResultsJson
    };

    const result = await db.prepare(
      `INSERT INTO leads (id, name, email, phone, message, source, tenant_id, status, ip, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      leadId,
      sanitizedName && sanitizedLastName 
        ? `${sanitizedName} ${sanitizedLastName}`.trim() 
        : body.email.split('@')[0],
      String(body.email).trim().toLowerCase(),
      body.phone || null,
      JSON.stringify(leadData), // Store additional data as JSON in message field
      body.source || "subscribe",
      process.env.DEFAULT_TENANT_ID || "default",
      "new",
      ip,
      Math.floor(Date.now() / 1000)
    ).run();

    if (!result.success) {
      console.error('D1 insert error:', result.error);
      return NextResponse.json(
        { error: "Failed to save lead" }, 
        { status: 500, headers: corsHeaders }
      );
    }

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

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: 'Lead captured successfully',
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getCORSHeaders(request.headers.get("origin")) }
    );
  }
}
