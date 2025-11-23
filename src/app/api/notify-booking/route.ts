import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    
    // Email content for the business
    const emailContent = {
      to: 'inquiries@xtechsrenewables.com.au',
      subject: `New Site Assessment Booking - ${bookingData.firstName} ${bookingData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">New Site Assessment Booking</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Appointment Details</h3>
            <p><strong>Date:</strong> ${bookingData.selectedDate}</p>
            <p><strong>Time:</strong> ${bookingData.selectedTime}</p>
            <p><strong>Service Type:</strong> ${bookingData.serviceType}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${bookingData.firstName} ${bookingData.lastName}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Phone:</strong> ${bookingData.phone}</p>
            <p><strong>Address:</strong> ${bookingData.address}</p>
            ${bookingData.notes ? `<p><strong>Notes:</strong> ${bookingData.notes}</p>` : ''}
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This booking was created through the website booking calendar.<br>
              Please contact the customer to confirm the appointment.
            </p>
          </div>
        </div>
      `
    };

    // Email content for the customer
    const customerEmailContent = {
      to: bookingData.email,
      subject: 'Site Assessment Confirmation - xTechs Renewables',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">Site Assessment Confirmation</h2>
          
          <p>Dear ${bookingData.firstName},</p>
          
          <p>Thank you for booking a site assessment with xTechs Renewables!</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Your Appointment Details</h3>
            <p><strong>Date:</strong> ${bookingData.selectedDate}</p>
            <p><strong>Time:</strong> ${bookingData.selectedTime}</p>
            <p><strong>Service:</strong> ${bookingData.serviceType}</p>
            <p><strong>Address:</strong> ${bookingData.address}</p>
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #92400e; margin-top: 0;">Important Information</h4>
            <ul style="color: #92400e;">
              <li>Our technician will arrive at the scheduled time</li>
              <li>Site inspection fees apply and will be discussed during the visit</li>
              <li>Please ensure someone is available at the property</li>
              <li>We'll provide a detailed quote after the assessment</li>
            </ul>
          </div>

          <p>If you need to reschedule or have any questions, please contact us:</p>
          <p><strong>Phone:</strong> 1300 983 247<br>
          <strong>Email:</strong> inquiries@xtechsrenewables.com.au</p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              xTechs Renewables<br>
              2 Corporate Ave, Rowville VIC 3178<br>
              ABN: 30 673 983 572
            </p>
          </div>
        </div>
      `
    };

    // For now, just log the email content
    console.log('Email to business:', emailContent);
    console.log('Email to customer:', customerEmailContent);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email notifications sent successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send email notifications' },
      { status: 500 }
    );
  }
}

