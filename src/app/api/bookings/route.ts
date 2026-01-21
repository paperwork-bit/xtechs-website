import { NextRequest, NextResponse } from 'next/server';
import { 
  verifyCaptcha, 
  getClientIP, 
  getCORSHeaders, 
  isValidEmail, 
  isValidPhone,
  isValidDate,
  isValidTime,
  sanitizeName,
  sanitizeMessage 
} from "@/lib/security";

export const runtime = 'edge';

// Helper function to convert time to minutes
function timeToMinutes(t: string): number {
  const [hh, mm] = t.split(':').map(Number);
  return hh * 60 + mm;
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: getCORSHeaders(origin),
  });
}

// Return booked slots for a date
export async function GET(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    const corsHeaders = getCORSHeaders(origin);
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json(
        { error: 'Missing date' }, 
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate date format
    if (!isValidDate(date)) {
      return NextResponse.json(
        { error: 'Invalid date format' }, 
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

    // Get all bookings for the specified date
    const result = await db.prepare(
      'SELECT selected_time FROM bookings WHERE selected_date = ?'
    ).bind(date).all();

    const times = result.results?.map((booking: any) => booking.selected_time) || [];
    
    return NextResponse.json(
      { date, times }, 
      { headers: corsHeaders }
    );
  } catch (e: any) {
    console.error('Get bookings error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch availability' }, 
      { status: 500, headers: getCORSHeaders(request.headers.get("origin")) }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    const corsHeaders = getCORSHeaders(origin);
    const bookingData = await request.json();
    
    // Verify CAPTCHA token (required for bookings)
    if (!bookingData.captchaToken || !(await verifyCaptcha(bookingData.captchaToken, request))) {
      return NextResponse.json(
        { error: "CAPTCHA verification failed" }, 
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'serviceType', 'selectedDate', 'selectedTime'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Validate and sanitize inputs
    const sanitizedFirstName = sanitizeName(bookingData.firstName);
    const sanitizedLastName = sanitizeName(bookingData.lastName);
    if (!sanitizedFirstName || !sanitizedLastName) {
      return NextResponse.json(
        { error: 'Invalid name format' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isValidEmail(bookingData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isValidPhone(bookingData.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isValidDate(bookingData.selectedDate)) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isValidTime(bookingData.selectedTime)) {
      return NextResponse.json(
        { error: 'Invalid time format' },
        { status: 400, headers: corsHeaders }
      );
    }

    const sanitizedAddress = sanitizeMessage(bookingData.address, 500);
    const sanitizedNotes = bookingData.notes ? sanitizeMessage(bookingData.notes, 1000) : '';

    // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
    const db = (process.env.DB as any) || (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' }, 
        { status: 500, headers: corsHeaders }
      );
    }

    // Check for time conflicts (90-minute rule)
    const existingBookings = await db.prepare(
      'SELECT selected_time FROM bookings WHERE selected_date = ?'
    ).bind(bookingData.selectedDate).all();

    const requested = timeToMinutes(bookingData.selectedTime);
    const conflict = existingBookings.results?.some((booking: any) => {
      const t = timeToMinutes(booking.selected_time);
      return requested === t || requested === t + 30 || requested === t + 60;
    });

    if (conflict) {
      return NextResponse.json({ 
        error: 'Time slot unavailable (90-minute rule)' 
      }, { status: 409 });
    }

    // Generate booking ID
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Insert booking into D1
    const result = await db.prepare(
      `INSERT INTO bookings (
        id, first_name, last_name, email, phone, address, service_type,
        selected_date, selected_time, type, notes, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      bookingId,
      sanitizedFirstName,
      sanitizedLastName,
      bookingData.email.trim().toLowerCase(),
      bookingData.phone.trim(),
      sanitizedAddress,
      bookingData.serviceType,
      bookingData.selectedDate,
      bookingData.selectedTime,
      bookingData.type || null,
      sanitizedNotes,
      'payment_pending',
      Math.floor(Date.now() / 1000) // Unix timestamp
    ).run();

    if (!result.success) {
      console.error('D1 insert error:', result.error);
      return NextResponse.json(
        { error: 'Failed to create booking' }, 
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Booking created successfully', bookingId },
      { status: 201, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' }, 
      { status: 500, headers: getCORSHeaders(request.headers.get("origin")) }
    );
  }
}
