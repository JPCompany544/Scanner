import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log('🔵 API Route Hit: /api/tracker');
  
  try {
    const body = await request.json();
    const page = body?.page || 'unknown';
    
    // Get the IP address from the request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = (forwarded ? forwarded.split(/, /)[0] : null) || 'unknown';
    
    // Get environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    console.log('🔔 Tracker hit:', { 
      page, 
      ip, 
      time: new Date().toISOString(),
      hasBotToken: !!botToken,
      hasChatId: !!chatId
    });

    // If you want to send to Telegram, uncomment this section
    /*
    if (botToken && chatId) {
      const message = `🚨 New Visitor\n` +
                     `🕒 Time: ${new Date().toLocaleString()}\n` +
                     `🌐 Page: ${page}\n` +
                     `📍 IP: ${ip}`;

      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }
    }
    */

    return NextResponse.json({ 
      status: 'success',
      message: 'Visitor tracked successfully',
      data: { page, ip, timestamp: new Date().toISOString() }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Tracker error:', errorMessage);
    return NextResponse.json(
      { 
        status: 'error', 
        message: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Simple GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Tracker API is working!',
    timestamp: new Date().toISOString()
  });
}
