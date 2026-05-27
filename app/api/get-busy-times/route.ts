import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Sri Lanka is UTC+5:30
const SL_OFFSET_MS = 5.5 * 60 * 60 * 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date'); // Expects 'yyyy-MM-dd'

  if (!date) {
    return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendarId) {
      throw new Error('Google Calendar ID is not set in .env.local');
    }

    // Query the full SL day (UTC+5:30) converted to UTC
    const [year, month, day] = date.split('-').map(Number);
    const timeMin = new Date(Date.UTC(year, month - 1, day, 0, 0, 0) - SL_OFFSET_MS);
    const timeMax = new Date(Date.UTC(year, month - 1, day, 23, 59, 59) - SL_OFFSET_MS);

    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;
    const busySlots = events
      ?.map((event) => {
        // Return the start time of each event
        return event.start?.dateTime;
      })
      .filter(Boolean) as string[]; // Filter out any undefined values

    return NextResponse.json({ busySlots });
  } catch (error: any) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json({ error: error.message || 'Error fetching busy times' }, { status: 500 });
  }
}