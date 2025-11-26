// Email utility for sending notifications via Resend
// Works with Cloudflare Edge runtime

const ADMIN_EMAIL = "inquiries@xtechsrenewables.com.au";
const FROM_EMAIL = "noreply@xtechsrenewables.com.au";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email using Resend API
 * Works in Cloudflare Edge runtime
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured - email not sent');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ''),
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Resend API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

/**
 * Send booking notification email to admin
 */
export async function sendBookingNotification(bookingData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  selectedDate: string;
  selectedTime: string;
  notes?: string;
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #059669; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin: 15px 0; }
        .field-label { font-weight: bold; color: #374151; }
        .field-value { margin-top: 5px; color: #6b7280; }
        .notes { background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New Site Assessment Booking</h2>
        </div>
        <div class="content">
          <h3 style="color: #059669; margin-top: 0;">Customer Details</h3>
          
          <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${bookingData.firstName} ${bookingData.lastName}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value"><a href="mailto:${bookingData.email}">${bookingData.email}</a></div>
          </div>
          
          <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value"><a href="tel:${bookingData.phone}">${bookingData.phone}</a></div>
          </div>
          
          <div class="field">
            <div class="field-label">Address:</div>
            <div class="field-value">${bookingData.address}</div>
          </div>
          
          <h3 style="color: #059669; margin-top: 30px;">Appointment Details</h3>
          
          <div class="field">
            <div class="field-label">Date:</div>
            <div class="field-value">${bookingData.selectedDate}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Time:</div>
            <div class="field-value">${bookingData.selectedTime}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Service Type:</div>
            <div class="field-value">${bookingData.serviceType}</div>
          </div>
          
          ${bookingData.notes ? `
          <div class="notes">
            <div class="field-label">Additional Notes:</div>
            <div class="field-value">${bookingData.notes}</div>
          </div>
          ` : ''}
          
          <div class="footer">
            <p>This is an automated notification from xTechs Renewables website.</p>
            <p>Booking submitted at: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Site Assessment Booking - ${bookingData.firstName} ${bookingData.lastName}`,
    html,
  });
}

/**
 * Send contact form notification email to admin
 */
export async function sendContactNotification(contactData: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  fileCount?: number;
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #059669; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin: 15px 0; }
        .field-label { font-weight: bold; color: #374151; }
        .field-value { margin-top: 5px; color: #6b7280; white-space: pre-wrap; }
        .message-box { background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #059669; margin-top: 10px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New Contact Form Submission</h2>
        </div>
        <div class="content">
          <h3 style="color: #059669; margin-top: 0;">Contact Information</h3>
          
          <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${contactData.firstName} ${contactData.lastName}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value"><a href="mailto:${contactData.email}">${contactData.email}</a></div>
          </div>
          
          <div class="field">
            <div class="field-label">Subject:</div>
            <div class="field-value">${contactData.subject}</div>
          </div>
          
          ${contactData.fileCount && contactData.fileCount > 0 ? `
          <div class="field">
            <div class="field-label">Attachments:</div>
            <div class="field-value">${contactData.fileCount} file(s) attached</div>
          </div>
          ` : ''}
          
          <h3 style="color: #059669; margin-top: 30px;">Message</h3>
          <div class="message-box">
            <div class="field-value">${contactData.message}</div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from xTechs Renewables website.</p>
            <p>Submitted at: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}</p>
            <p><a href="mailto:${contactData.email}">Reply to ${contactData.firstName} ${contactData.lastName}</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: ADMIN_EMAIL,
    subject: `Contact Form: ${contactData.subject}`,
    html,
  });
}

