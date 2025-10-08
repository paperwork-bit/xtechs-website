import { NextRequest, NextResponse } from 'next/server';
import { addBookingToSheet, getBookingsForDate, type BookingData } from '@/lib/googleAppsScript';

function timeToMinutes(t: string): number {
  const [hh, mm] = t.split(':').map(Number);
  return hh * 60 + mm;
}
function minutesToTime(m: number): string {
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
}

// Return booked slots for a date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    if (!date) {
      return NextResponse.json({ error: 'Missing date' }, { status: 400 });
    }
    
    const bookings = await getBookingsForDate(date);
    const times = bookings.map(booking => booking.selectedTime);
    return NextResponse.json({ date, times });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    
    // Verify CAPTCHA token
    if (!bookingData.captchaToken) {
      return NextResponse.json({ 
        error: "CAPTCHA verification required" 
      }, { status: 400 });
    }
    
    // Verify CAPTCHA with Google (optional - for enhanced security)
    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY
      if (secretKey) {
        const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${secretKey}&response=${bookingData.captchaToken}`
        })
        const captchaResult = await captchaResponse.json()
        if (!captchaResult.success) {
          return NextResponse.json({ 
            error: "CAPTCHA verification failed" 
          }, { status: 400 });
        }
      }
    } catch (captchaError) {
      console.warn('CAPTCHA verification error:', captchaError)
      // Continue without server-side verification if it fails
    }
    
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'serviceType', 'selectedDate', 'selectedTime'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check for time conflicts
    const existingBookings = await getBookingsForDate(bookingData.selectedDate);
    const requested = timeToMinutes(bookingData.selectedTime);
    const conflict = existingBookings.some((booking) => {
      const t = timeToMinutes(booking.selectedTime);
      return requested === t || requested === t + 30 || requested === t + 60;
    });
    if (conflict) {
      return NextResponse.json({ error: 'Time slot unavailable (90-minute rule)' }, { status: 409 });
    }

    const payload: BookingData = {
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      address: bookingData.address,
      serviceType: bookingData.serviceType,
      notes: bookingData.notes || '',
      selectedDate: bookingData.selectedDate,
      selectedTime: bookingData.selectedTime,
      type: bookingData.type,
      createdAt: new Date().toISOString(),
    };
    const result = await addBookingToSheet(payload);

    return NextResponse.json(
      { success: true, message: 'Booking created successfully', bookingId: result.bookingId },
      { status: 201 }
    );

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
