import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface LocationData {
  country: string;
  city: string;
  region?: string;
  isp?: string;
  mobile?: boolean;
  proxy?: boolean;
  hosting?: boolean;
  lat?: number;
  lon?: number;
  org?: string;
  query?: string;
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log('🔵 API Route Hit: /api/tracker');
  
  try {
    const body = await request.json();
    const page = body?.page || 'unknown';
    const userAgent = body?.userAgent || 'Unknown';
    
    // Get the IP address from the request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = (forwarded ? forwarded.split(/, /)[0] : null) || 'unknown';
    
    // Get environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    // Fetch location data
    let locationData: LocationData = { country: 'Unknown', city: 'Unknown' };
    try {
      const ipApiUrl = `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,isp,org,as,mobile,proxy,hosting,query`;
      console.log('🌍 Fetching location data from:', ipApiUrl);
      const response = await fetch(ipApiUrl);
      const data = await response.json();
      
      if (data.status === 'success') {
        locationData = {
          country: data.country || 'Unknown',
          city: data.city || 'Unknown',
          region: data.regionName,
          isp: data.isp,
          mobile: data.mobile,
          proxy: data.proxy,
          hosting: data.hosting,
          lat: data.lat,
          lon: data.lon,
          org: data.org,
          query: data.query
        };
      }
    } catch (locationError) {
      console.error('❌ Location lookup error:', locationError);
    }
    
    console.log('🔔 Tracker hit:', { 
      page, 
      ip,
      location: locationData,
      time: new Date().toISOString(),
      hasBotToken: !!botToken,
      hasChatId: !!chatId,
      userAgent
    });

    // Send notification to Telegram if credentials are available
    if (botToken && chatId) {
      try {
        const mapLink = locationData.lat && locationData.lon 
          ? `https://www.google.com/maps?q=${locationData.lat},${locationData.lon}`
          : '';
        
        const message = `🚨 *New Visitor*\n` +
                     `🕒 *Time*: ${new Date().toLocaleString()}\n` +
                     `🌐 *Page*: ${page}\n` +
                     `📍 *IP*: \`${ip}\`\n` +
                     `🌍 *Location*: ${locationData.city}, ${locationData.country}${locationData.region ? `, ${locationData.region}` : ''}\n` +
                     (mapLink ? `🗺️ *Map*: [View on Google Maps](${mapLink})\n` : '') +
                     `🏢 *ISP*: ${locationData.isp || 'Unknown'}\n` +
                     (locationData.org ? `🏛️ *Organization*: ${locationData.org}\n` : '') +
                     `📱 *User Agent*: \`${userAgent}\`\n` +
                     `🔍 *Details*: ${locationData.mobile ? '📱 Mobile' : ''} ${locationData.proxy ? '| 🔄 Proxy' : ''} ${locationData.hosting ? '| ☁️ Hosting' : ''}`.trim();

        console.log('📤 Sending to Telegram...');
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const telegramResponse = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
          }),
        });

        const telegramData = await telegramResponse.json();
        console.log('📩 Telegram API Response:', {
          status: telegramResponse.status,
          data: telegramData
        });

        if (!telegramResponse.ok) {
          throw new Error(`Telegram API error: ${JSON.stringify(telegramData)}`);
        }
      } catch (telegramError) {
        console.error('❌ Telegram Error:', telegramError);
        // Don't fail the entire request if Telegram fails
      }
    }

    return NextResponse.json({ 
      status: 'success',
      message: 'Visitor tracked successfully',
      data: { 
        page, 
        ip, 
        location: locationData,
        timestamp: new Date().toISOString(),
        userAgent
      }
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
