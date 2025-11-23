import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, source, tenantId } = body || {};

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get D1 database from Cloudflare Pages binding
    // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
    const db = (process.env.DB as any) || (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json({ 
        ok: false, 
        error: "Database not available. Make sure DB binding is configured." 
      }, { status: 500 });
    }

    // Generate unique ID for lead
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";

    // Insert lead into D1 database
    const result = await db.prepare(
      `INSERT INTO leads (id, name, email, phone, message, source, tenant_id, status, ip, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      leadId,
      String(name).trim(),
      String(email).trim().toLowerCase(),
      phone ? String(phone).trim() : null,
      message ? String(message).trim() : null,
      source || "contact",
      tenantId || process.env.DEFAULT_TENANT_ID || "default",
      "new",
      ip,
      Math.floor(Date.now() / 1000) // Unix timestamp
    ).run();

    if (!result.success) {
      console.error('D1 insert error:', result.error);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, leadId }, { status: 200 });
  } catch (err: any) {
    console.error('Lead submission error:', err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


