import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface RecommenderLead {
  name: string;
  email: string;
  phone?: string;
  suburbOrPostcode?: string;
  nmi?: string;
  inputs: {
    phase: 'single' | 'three';
    roofType: 'tile' | 'tin' | 'flat';
    storeys: 1 | 2 | 3;
    billingPeriod: 'monthly' | 'quarterly';
    billAmount: number;
    usageLevel: 'basic' | 'moderate' | 'heavy';
    assumedTariffCents: number;
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
  consent: {
    marketingOptIn?: boolean;
    ts: number;
  };
  createdAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RecommenderLead = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate unique ID
    const leadId = `recommender_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store lead data (in production, save to database)
    const leadRecord = {
      ...body,
      id: leadId,
      status: 'new',
      processedAt: new Date().toISOString(),
    };

    // Log the lead (in production, save to database)
    console.log('New recommender lead captured:', {
      id: leadRecord.id,
      name: body.name,
      email: body.email,
      hasNMI: !!body.nmi,
      optionsCount: body.options.length,
      marketingOptIn: body.consent.marketingOptIn,
    });

    // Send email notification if configured
    if (process.env.VITE_EMAIL_ENDPOINT) {
      try {
        const emailResponse = await fetch(process.env.VITE_EMAIL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.EMAIL_API_KEY || ''}`,
          },
          body: JSON.stringify({
            to: body.email,
            template: 'recommender_options',
            data: {
              name: body.name,
              options: body.options,
              hasNMI: !!body.nmi,
            },
          }),
        });

        if (!emailResponse.ok) {
          console.warn('Failed to send recommender email:', await emailResponse.text());
        }
      } catch (emailError) {
        console.warn('Email service error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      leadId: leadRecord.id,
      message: 'Lead captured successfully',
    });

  } catch (error) {
    console.error('Recommender lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
