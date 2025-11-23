import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// Note: firebase-admin requires Node.js runtime, not Edge
// Cloudflare Pages may not support this route - consider refactoring to use client SDK
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, source, tenantId } = body || {};

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Basic anti-spam: rate limiting key by IP and ts could be added later
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    const doc = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : null,
      message: message ? String(message).trim() : null,
      source: source || "contact",
      tenantId: tenantId || process.env.DEFAULT_TENANT_ID || "default",
      status: "new",
      ip,
      createdAt: new Date(),
    };

    await adminDb.collection("leads").add(doc);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


