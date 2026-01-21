import { NextRequest, NextResponse } from "next/server";
import { sendBookingNotification } from "@/lib/email";
import { isValidEmail, isValidPhone, isValidDate, isValidTime, sanitizeName, sanitizeMessage } from "@/lib/security";

export const runtime = "edge";

/**
 * Sends the admin notification email. This is intentionally decoupled from the D1 insert
 * so bookings can still redirect to Stripe even if email sending is slow/unavailable.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate/sanitize minimal required fields (fail soft: we still return 200 so redirect isn't blocked)
    const firstName = sanitizeName(body.firstName) || "Unknown";
    const lastName = sanitizeName(body.lastName) || "Unknown";
    const email = isValidEmail(body.email || "") ? String(body.email).trim().toLowerCase() : "unknown";
    const phone = isValidPhone(body.phone || "") ? String(body.phone).trim() : "unknown";
    const selectedDate = isValidDate(body.selectedDate || "") ? String(body.selectedDate) : "unknown";
    const selectedTime = isValidTime(body.selectedTime || "") ? String(body.selectedTime) : "unknown";
    const address = sanitizeMessage(body.address || "", 500) || "unknown";
    const serviceType = sanitizeMessage(body.serviceType || "", 200) || "unknown";
    const notes = body.notes ? (sanitizeMessage(body.notes, 1000) || undefined) : undefined;

    const bookingId = typeof body.bookingId === "string" ? body.bookingId : undefined;
    const paymentUrl = typeof body.paymentUrl === "string" ? body.paymentUrl : undefined;
    const bookingSaved = typeof body.bookingSaved === "boolean" ? body.bookingSaved : true;

    // Default to pending (we only mark paid via Stripe webhook)
    const paymentStatus =
      body.paymentStatus === "paid" || body.paymentStatus === "pending" || body.paymentStatus === "unknown"
        ? body.paymentStatus
        : "pending";

    await sendBookingNotification({
      bookingId,
      firstName,
      lastName,
      email,
      phone,
      address,
      serviceType,
      selectedDate,
      selectedTime,
      notes,
      paymentStatus,
      paymentUrl,
      bookingSaved,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("notify-booking error:", error);
    // Fail soft: client should still redirect to Stripe
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

