import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { addDays, format } from 'date-fns';

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

    // Set timeMin to the start of the selected day (in local time)
    const timeMin = new Date(`${date}T00:00:00`);
    
    // Set timeMax to the end of the selected day
    const timeMax = new Date(`${date}T23:59:59`);

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