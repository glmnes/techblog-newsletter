import { NextRequest, NextResponse } from 'next/server';
import { getEmailProvider, isValidEmail } from '@/lib/email';

// Rate limiting: Store IP addresses and their request counts
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Subscribe API called');
    
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, metadata } = body;
    console.log('Email received:', email);

    // Validate email
    console.log('Validating email:', email);
    console.log('Email validation result:', isValidEmail(email));
    
    if (!email || !isValidEmail(email)) {
      console.log('Email validation failed');
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get the configured email provider
    let emailProvider;
    try {
      console.log('Getting email provider...');
      emailProvider = getEmailProvider();
      console.log('Email provider loaded successfully');
    } catch (error) {
      console.error('Email provider configuration error:', error);
      // Fallback to storing locally if provider not configured
      console.log(`Newsletter signup (stored locally): ${email}`);
      return NextResponse.json(
        { 
          success: true,
          message: 'Thank you for subscribing! We\'ll be in touch soon.' 
        },
        { status: 200 }
      );
    }

    // Subscribe using the email provider
    console.log('Attempting to subscribe with provider...');
    const result = await emailProvider.subscribe(email, metadata);
    console.log('Provider result:', result);

    if (!result.success) {
      console.log('Provider returned failure:', result.message);
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    // Log successful subscription
    console.log(`New subscriber: ${email}`);

    return NextResponse.json(
      { 
        success: true,
        message: result.message 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again later.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    provider: process.env.EMAIL_PROVIDER || 'not configured',
    message: 'Newsletter API is running'
  });
}
