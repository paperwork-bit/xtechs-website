import { NextResponse } from "next/server";
import { 
  verifyCaptcha, 
  getClientIP, 
  getCORSHeaders, 
  isValidEmail, 
  sanitizeName,
  sanitizeMessage 
} from "@/lib/security";
import { sendContactNotification } from "@/lib/email";

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
    const formData = await req.formData();
    
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const captchaToken = formData.get("captchaToken") as string;
    const fileCount = parseInt((formData.get("fileCount") as string) || "0") || 0;
    
    // Extract file attachments
    const attachments: Array<{ filename: string; content: string }> = [];
    if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        const file = formData.get(`file_${i}`) as File | null;
        if (file) {
          try {
            const arrayBuffer = await file.arrayBuffer();
            // Convert ArrayBuffer to base64 (handles large files efficiently)
            const bytes = new Uint8Array(arrayBuffer);
            let binary = '';
            const len = bytes.byteLength;
            for (let j = 0; j < len; j++) {
              binary += String.fromCharCode(bytes[j]);
            }
            const base64 = btoa(binary);
            
            attachments.push({
              filename: file.name,
              content: base64,
            });
            console.log(`File ${i} processed: ${file.name}, size: ${file.size} bytes`);
          } catch (error) {
            console.error(`Error processing file ${i} (${file.name}):`, error);
          }
        }
      }
    }
    
    console.log(`Total attachments extracted: ${attachments.length}`);
    
    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ 
        ok: false, 
        error: "Missing required fields" 
      }, { status: 400, headers: corsHeaders });
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      return NextResponse.json(
        { ok: false, error: "CAPTCHA verification required" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!(await verifyCaptcha(captchaToken, req))) {
      return NextResponse.json(
        { ok: false, error: "CAPTCHA verification failed. Please try again." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate and sanitize inputs
    const sanitizedName = sanitizeName(`${firstName} ${lastName}`.trim());
    if (!sanitizedName) {
      return NextResponse.json(
        { ok: false, error: "Invalid name format" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Build message with subject and file info
    let fullMessage = `Subject: ${subject}\n\n${message}`;
    if (fileCount > 0) {
      fullMessage += `\n\n[${fileCount} file(s) attached]`;
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedSubject = sanitizeMessage(subject, 200) || subject.trim();
    const sanitizedMessage = sanitizeMessage(fullMessage, 5000);

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
    const leadId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ip = getClientIP(req);

    // Insert lead into D1 database
    const result = await db.prepare(
      `INSERT INTO leads (id, name, email, phone, message, source, tenant_id, status, ip, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      leadId,
      sanitizedName,
      sanitizedEmail,
      null, // phone
      sanitizedMessage,
      "contact-form",
      process.env.DEFAULT_TENANT_ID || "Sales",
      "new",
      ip,
      Math.floor(Date.now() / 1000) // Unix timestamp
    ).run();

    if (!result.success) {
      console.error('D1 insert error:', result.error);
      return NextResponse.json(
        { ok: false, error: "Failed to save message" },
        { status: 500, headers: corsHeaders }
      );
    }

    // Send email notification (don't fail if email fails)
    try {
      console.log(`Sending email with ${attachments.length} attachment(s)`);
      const emailSent = await sendContactNotification({
        firstName,
        lastName,
        email: sanitizedEmail,
        subject: sanitizedSubject || subject,
        message: sanitizedMessage || fullMessage,
        fileCount,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
      if (emailSent) {
        console.log('Email notification sent successfully');
      } else {
        console.warn('Email notification failed to send');
      }
    } catch (emailError) {
      console.error('Failed to send contact notification email:', emailError);
      // Continue even if email fails - message is saved
    }

    return NextResponse.json(
      { ok: true, leadId },
      { status: 200, headers: corsHeaders }
    );
    
  } catch (e: any) {
    console.error("Contact form error:", e);
    const origin = req.headers.get("origin");
    return NextResponse.json({ 
      ok: false, 
      error: e?.message || "Unknown error" 
    }, { status: 500, headers: getCORSHeaders(origin) });
  }
}
