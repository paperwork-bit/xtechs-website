import { NextRequest, NextResponse } from 'next/server';
import { 
  getCORSHeaders, 
  isValidEmail,
  sanitizeName,
  sanitizeMessage 
} from "@/lib/security";
import { sendChatbotInquiryNotification } from "@/lib/email";

export const runtime = 'edge';

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
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
    
    const { fullName, email, address, phone, source = "chatbot" } = body;

    // Validate required fields
    if (!fullName || !email || !address) {
      return NextResponse.json(
        { error: 'Full name, email, and address are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeName(fullName);
    if (!sanitizedName) {
      return NextResponse.json(
        { error: 'Invalid name format' },
        { status: 400, headers: corsHeaders }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedAddress = sanitizeMessage(address);
    const sanitizedPhone = phone ? phone.trim() : null;

    // Ensure address is not null (shouldn't happen due to validation, but TypeScript needs this)
    if (!sanitizedAddress) {
      return NextResponse.json(
        { error: 'Invalid address format' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Get D1 database from Cloudflare Pages binding
    // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
    const db = (process.env.DB as any) || (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json({ 
        ok: false, 
        error: "Service temporarily unavailable" 
      }, { status: 500, headers: corsHeaders });
    }

    // Generate unique ID for lead
    const leadId = `chatbot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Insert lead into D1 database
    // Note: Using the same leads table structure as /api/leads
    const result = await db.prepare(
      `INSERT INTO leads (id, name, email, phone, message, source, tenant_id, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      leadId,
      sanitizedName,
      sanitizedEmail,
      sanitizedPhone,
      `Address: ${sanitizedAddress}`, // Store address in message field
      source,
      process.env.DEFAULT_TENANT_ID || "default",
      "new",
      Math.floor(Date.now() / 1000) // Unix timestamp
    ).run();

    if (!result.success) {
      console.error('D1 insert error:', result.error);
      return NextResponse.json(
        { error: "Failed to save lead" }, 
        { status: 500, headers: corsHeaders }
      );
    }

    // Send email notification to inquiries@xtechsrenewables.com.au
    // Fire-and-forget: don't block response if email fails
    try {
      const emailSent = await sendChatbotInquiryNotification({
        fullName: sanitizedName,
        email: sanitizedEmail,
        address: sanitizedAddress, // Now guaranteed to be string after null check
        phone: sanitizedPhone || undefined,
      });
      
      if (emailSent) {
        console.log('Chatbot inquiry email sent successfully to inquiries@xtechsrenewables.com.au');
      } else {
        console.warn('Chatbot inquiry email failed to send - check RESEND_API_KEY configuration');
      }
    } catch (emailError) {
      console.error('Failed to send chatbot inquiry email:', emailError);
      // Don't throw - email failure shouldn't fail the request
    }

    return NextResponse.json(
      { ok: true, leadId }, 
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Chatbot lead submission error:', err);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500, headers: getCORSHeaders(request.headers.get("origin")) }
    );
  }
}

