import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure this route is not statically generated

export async function POST(request: NextRequest) {
  console.log('🔵 API Route Hit: /api/tracker');
  try {
    // Parse the request body
    const body = await request.json();
    const page = body?.page || 'unknown';
    
    // Get the IP address from the request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = (forwarded ? forwarded.split(/, /)[0] : null) || 'unknown';
    
    // Get environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const currentTime = new Date().toISOString();

    // Log the request
    console.log('🔔 Tracker hit:', { 
      page, 
      ip, 
      time: currentTime,
      hasBotToken: !!botToken,
      hasChatId: !!chatId
    });

    // Check if required environment variables are set
    if (!botToken || !chatId) {
      const errorMsg = 'Missing required environment variables: ' + 
        (!botToken ? 'TELEGRAM_BOT_TOKEN ' : '') + 
        (!chatId ? 'TELEGRAM_CHAT_ID' : '');
      
      console.error('❌', errorMsg);
      return NextResponse.json(
        { status: 'error', message: errorMsg },
        { status: 500 }
      );
    }

    // Prepare the message for Telegram
    const message = `🚨 *New Visitor*\n` +
                   `🕒 *Time*: ${new Date().toLocaleString()}\n` +
                   `🌐 *Page*: ${page}\n` +
                   `📍 *IP*: ${ip}`;

    // Send message to Telegram
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

    // Handle Telegram API response
    const responseData = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      throw new Error(
        `Telegram API error (${response.status}): ${JSON.stringify(responseData)}`
      );
    }

    return NextResponse.json({ 
      status: 'success',
      message: 'Visitor tracked successfully'
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

// Add a simple GET handler for testing the endpoint
export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Tracker API is running',
    timestamp: new Date().toISOString()
  });
}
