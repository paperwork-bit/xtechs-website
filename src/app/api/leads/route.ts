import { NextResponse } from "next/server";
import { 
  verifyCaptcha, 
  getClientIP, 
  getCORSHeaders, 
  isValidEmail, 
  isValidPhone,
  sanitizeName,
  sanitizeMessage 
} from "@/lib/security";
import { sendLeadNotification } from "@/lib/email";

export const runtime = 'edge';

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: getCORSHeaders(origin),
  });
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin");
    const corsHeaders = getCORSHeaders(origin);

    const body = await req.json();
    const { name, email, phone, message, source, tenantId, captchaToken } = body || {};

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400, headers: corsHeaders }
      );
    }

    // Verify CAPTCHA if provided
    if (captchaToken && !(await verifyCaptcha(captchaToken, req))) {
      return NextResponse.json(
        { error: "CAPTCHA verification failed" }, 
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate and sanitize inputs
    const sanitizedName = sanitizeName(name);
    if (!sanitizedName) {
      return NextResponse.json(
        { error: "Invalid name format" }, 
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" }, 
        { status: 400, headers: corsHeaders }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? (isValidPhone(phone) ? phone.trim() : null) : null;
    const sanitizedMessage = message ? sanitizeMessage(message) : null;

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
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ip = getClientIP(req);

    // Insert lead into D1 database
    const result = await db.prepare(
      `INSERT INTO leads (id, name, email, phone, message, source, tenant_id, status, ip, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      leadId,
      sanitizedName,
      sanitizedEmail,
      sanitizedPhone,
      sanitizedMessage,
      source || "contact",
      tenantId || process.env.DEFAULT_TENANT_ID || "default",
      "new",
      ip,
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
    // Don't fail the request if email fails.
    try {
      const emailSent = await sendLeadNotification({
        leadId,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        message: sanitizedMessage,
        source: source || null,
        tenantId: tenantId || null,
        ip: ip || null,
      });

      if (emailSent) {
        console.log("Lead notification email sent successfully");
      } else {
        console.warn("Lead notification email failed to send - check RESEND_API_KEY configuration");
      }
    } catch (emailError) {
      console.error("Failed to send lead notification email:", emailError);
      // Continue even if email fails - lead is saved
    }

    return NextResponse.json(
      { ok: true, leadId }, 
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Lead submission error:', err);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500, headers: getCORSHeaders(req.headers.get("origin")) }
    );
  }
}


