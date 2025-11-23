import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Helper function to convert time to minutes
function timeToMinutes(t: string): number {
  const [hh, mm] = t.split(':').map(Number);
  return hh * 60 + mm;
}

// Return booked slots for a date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json({ error: 'Missing date' }, { status: 400 });
    }

    // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
    const db = (process.env.DB as any) || (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }

    // Get all bookings for the specified date
    const result = await db.prepare(
      'SELECT selected_time FROM bookings WHERE selected_date = ?'
    ).bind(date).all();

    const times = result.results?.map((booking: any) => booking.selected_time) || [];
    
    return NextResponse.json({ date, times });
  } catch (e: any) {
    console.error('Get bookings error:', e);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    
    // Verify CAPTCHA token if provided
    if (bookingData.captchaToken) {
      try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (secretKey) {
          const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secretKey}&response=${bookingData.captchaToken}`
          });
          const captchaResult = await captchaResponse.json();
          if (!captchaResult.success) {
            return NextResponse.json({ 
              error: "CAPTCHA verification failed" 
            }, { status: 400 });
          }
        }
      } catch (captchaError) {
        console.warn('CAPTCHA verification error:', captchaError);
        // Continue without server-side verification if it fails
      }
    }
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'serviceType', 'selectedDate', 'selectedTime'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
    const db = (process.env.DB as any) || (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
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
      bookingData.firstName,
      bookingData.lastName,
      bookingData.email,
      bookingData.phone,
      bookingData.address,
      bookingData.serviceType,
      bookingData.selectedDate,
      bookingData.selectedTime,
      bookingData.type || null,
      bookingData.notes || '',
      'new',
      Math.floor(Date.now() / 1000) // Unix timestamp
    ).run();

    if (!result.success) {
      console.error('D1 insert error:', result.error);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: 'Booking created successfully', bookingId },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
