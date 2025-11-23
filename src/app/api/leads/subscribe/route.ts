import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.consentMarketing) {
      return NextResponse.json(
        { error: 'Email and marketing consent are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
    const db = (process.env.DB as any) || (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }

    // Generate unique ID for lead
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("cf-connecting-ip") || "unknown";

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
      body.firstName && body.lastName ? `${body.firstName} ${body.lastName}`.trim() : body.email.split('@')[0],
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
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
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

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Lead captured successfully',
    });

  } catch (error: any) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
