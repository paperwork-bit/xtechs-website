import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface EmailOptionsRequest {
  lead: {
    name: string;
    email: string;
    phone?: string;
    suburbOrPostcode?: string;
    nmi?: string;
  };
  options: Array<{
    id: string;
    name: string;
    tier: 'value' | 'balanced' | 'premium';
    systemSize: number;
    batterySize?: number;
    features: string[];
    description: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailOptionsRequest = await request.json();
    
    // Validate required fields
    if (!body.lead.email || !body.options.length) {
      return NextResponse.json(
        { error: 'Email and options are required' },
        { status: 400 }
      );
    }

    // Send email with options
    if (process.env.VITE_EMAIL_ENDPOINT) {
      try {
        const emailResponse = await fetch(process.env.VITE_EMAIL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.EMAIL_API_KEY || ''}`,
          },
          body: JSON.stringify({
            to: body.lead.email,
            template: 'solar_options_summary',
            data: {
              name: body.lead.name,
              options: body.options,
              hasNMI: !!body.lead.nmi,
              nmi: body.lead.nmi,
            },
          }),
        });

        if (!emailResponse.ok) {
          console.warn('Failed to send options email:', await emailResponse.text());
          return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
          );
        }
      } catch (emailError) {
        console.warn('Email service error:', emailError);
        return NextResponse.json(
          { error: 'Email service unavailable' },
          { status: 500 }
        );
      }
    } else {
      // If no email service configured, just log
      console.log('Email options request (no service configured):', {
        email: body.lead.email,
        optionsCount: body.options.length,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Options email sent successfully',
    });

  } catch (error) {
    console.error('Email options error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
