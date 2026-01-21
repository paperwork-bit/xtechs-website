import { NextRequest, NextResponse } from "next/server";
import { sendBookingPaymentUpdate } from "@/lib/email";

export const runtime = "edge";

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a[i] ^ b[i];
  return out === 0;
}

function hexToBytes(hex: string) {
  const clean = hex.trim();
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function hmacSha256Hex(secret: string, message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  const bytes = new Uint8Array(sig);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function parseStripeSignatureHeader(sigHeader: string | null) {
  if (!sigHeader) return null;
  const parts = sigHeader.split(",").map((p) => p.trim());
  const tPart = parts.find((p) => p.startsWith("t="));
  const v1Parts = parts.filter((p) => p.startsWith("v1="));
  if (!tPart || v1Parts.length === 0) return null;
  const t = tPart.slice(2);
  const v1 = v1Parts.map((p) => p.slice(3));
  return { t, v1 };
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const sigHeader = req.headers.get("stripe-signature");
  const parsed = parseStripeSignatureHeader(sigHeader);
  if (!parsed) {
    return NextResponse.json({ error: "Missing/invalid Stripe-Signature" }, { status: 400 });
  }

  // Raw body required for signature verification
  const bodyText = await req.text();
  const signedPayload = `${parsed.t}.${bodyText}`;
  const expectedHex = await hmacSha256Hex(webhookSecret, signedPayload);
  const expected = hexToBytes(expectedHex);
  const matches = parsed.v1.some((hex) => {
    try {
      return timingSafeEqual(hexToBytes(hex), expected);
    } catch {
      return false;
    }
  });

  if (!matches) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only handle the event we need for reconciliation
  if (event?.type === "checkout.session.completed") {
    const session = event?.data?.object;
    const bookingId = session?.client_reference_id;

    // Update booking status in D1 if available
    try {
      // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
      const db = (process.env.DB as any) || (globalThis as any).DB;
      if (db && bookingId) {
        await db
          .prepare("UPDATE bookings SET status = ? WHERE id = ?")
          .bind("paid", bookingId)
          .run();
      }
    } catch (e) {
      console.error("Failed to update booking payment status:", e);
    }

    // Notify admin by email
    try {
      if (bookingId) {
        await sendBookingPaymentUpdate({
          bookingId,
          paymentStatus: "paid",
          amount: typeof session?.amount_total === "number" ? session.amount_total : null,
          currency: typeof session?.currency === "string" ? session.currency : null,
          customerEmail:
            typeof session?.customer_details?.email === "string"
              ? session.customer_details.email
              : typeof session?.customer_email === "string"
                ? session.customer_email
                : null,
          stripeSessionId: typeof session?.id === "string" ? session.id : null,
        });
      }
    } catch (e) {
      console.error("Failed to send payment update email:", e);
    }
  }

  // Always acknowledge webhook quickly
  return NextResponse.json({ received: true }, { status: 200 });
}

