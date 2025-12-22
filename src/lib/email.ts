// Email utility for sending notifications via Resend
// Works with Cloudflare Edge runtime

const ADMIN_EMAIL = "inquiries@xtechsrenewables.com.au";
const FROM_EMAIL = "noreply@xtechsrenewables.com.au";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: string | ArrayBuffer; // base64 encoded or ArrayBuffer
    contentType?: string;
  }>;
}

/**
 * Send email using Resend API
 * Works in Cloudflare Edge runtime
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured - email not sent');
    console.error('To: ', options.to);
    console.error('Subject: ', options.subject);
    return false;
  }

  try {
    const emailPayload: any = {
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
    };

    // Add attachments if provided
    if (options.attachments && options.attachments.length > 0) {
      emailPayload.attachments = options.attachments.map(att => {
        // Content should already be base64 string from the API route
        const content = typeof att.content === 'string' 
          ? att.content 
          : btoa(String.fromCharCode(...new Uint8Array(att.content as ArrayBuffer)));
        
        console.log(`Attaching file: ${att.filename}, content length: ${content.length}`);
        
        return {
          filename: att.filename,
          content: content,
          contentType: att.contentType,
        };
      });
      console.log(`Total attachments to send: ${emailPayload.attachments.length}`);
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const responseData = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      console.error('Resend API error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
        to: options.to,
        from: FROM_EMAIL,
        subject: options.subject,
        attachmentsCount: emailPayload.attachments?.length || 0,
      });
      return false;
    }

    console.log('Email sent successfully:', {
      id: responseData.id,
      to: options.to,
      from: FROM_EMAIL,
      subject: options.subject,
      attachmentsCount: emailPayload.attachments?.length || 0,
    });

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
  attachments?: Array<{
    filename: string;
    content: string | ArrayBuffer;
    contentType?: string;
  }>;
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
          
          ${contactData.attachments && contactData.attachments.length > 0 ? `
          <div class="field">
            <div class="field-label">Attachments (${contactData.attachments.length} file(s)):</div>
            <div class="field-value">
              <ul style="margin: 5px 0; padding-left: 20px;">
                ${contactData.attachments.map(att => `<li>${att.filename}</li>`).join('')}
              </ul>
            </div>
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
    attachments: contactData.attachments,
  });
}

/**
 * Send chatbot inquiry notification email to admin
 * Triggered when a user provides name, email, and address in the chatbot
 */
export async function sendChatbotInquiryNotification(customerData: {
  fullName: string;
  email: string;
  address: string;
  phone?: string;
  siteVisitDate?: string;
  siteVisitTime?: string;
  systemType?: string;
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
        .source-badge { display: inline-block; background-color: #059669; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; margin-left: 10px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New Chatbot Inquiry <span class="source-badge">Chatbot</span></h2>
        </div>
        <div class="content">
          <h3 style="color: #059669; margin-top: 0;">Customer Information</h3>
          
          <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${customerData.fullName}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value"><a href="mailto:${customerData.email}">${customerData.email}</a></div>
          </div>
          
          <div class="field">
            <div class="field-label">Address:</div>
            <div class="field-value">${customerData.address}</div>
          </div>
          
          ${customerData.phone ? `
          <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value"><a href="tel:${customerData.phone}">${customerData.phone}</a></div>
          </div>
          ` : ''}
          
          ${customerData.systemType ? `
          <div class="field">
            <div class="field-label">System Type:</div>
            <div class="field-value">${customerData.systemType}</div>
          </div>
          ` : ''}
          
          ${customerData.siteVisitDate || customerData.siteVisitTime ? `
          <h3 style="color: #059669; margin-top: 30px;">Site Visit Information</h3>
          
          ${customerData.siteVisitDate ? `
          <div class="field">
            <div class="field-label">Visit Date:</div>
            <div class="field-value">${customerData.siteVisitDate}</div>
          </div>
          ` : ''}
          
          ${customerData.siteVisitTime ? `
          <div class="field">
            <div class="field-label">Visit Time:</div>
            <div class="field-value">${customerData.siteVisitTime}</div>
          </div>
          ` : ''}
          ` : ''}
          
          <div class="footer">
            <p>This is an automated notification from xTechs Renewables chatbot.</p>
            <p>Customer information collected at: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}</p>
            <p><a href="mailto:${customerData.email}">Reply to ${customerData.fullName}</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  console.log('Sending chatbot inquiry email to:', ADMIN_EMAIL);
  console.log('Customer data:', {
    fullName: customerData.fullName,
    email: customerData.email,
    address: customerData.address,
    phone: customerData.phone || 'not provided',
    systemType: customerData.systemType || 'not provided',
    siteVisitDate: customerData.siteVisitDate || 'not provided',
    siteVisitTime: customerData.siteVisitTime || 'not provided',
  });
  
  return await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Chatbot Inquiry - ${customerData.fullName}`,
    html,
  });
}

