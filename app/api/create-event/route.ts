import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, companyName, brief } = body;

    // start/end may be provided as ISO `startTime`/`endTime` or as `date` + `startTime` (HH:mm)
    let { startTime, endTime } = body as any;
    const dateField = body.date || body.day || null

    const DEFAULT_APPOINTMENT_MINUTES = Number(process.env.DEFAULT_APPOINTMENT_MINUTES || '30')
    const buildFromDateAndTime = (dateStr?: string, timeStr?: string) => {
      if (!dateStr || !timeStr) return null
      const dateParts = String(dateStr).split('-').map((p) => Number(p))
      const timeParts = String(timeStr).split(':').map((p) => Number(p))
      if (dateParts.length < 3 || timeParts.length < 2) return null
      const [year, month, day] = dateParts
      const [hour, minute] = timeParts
      return new Date(year, (month || 1) - 1, day, hour || 0, minute || 0, 0)
    }

    if ((!startTime || startTime === '') && dateField && body.startTime) {
      const dt = buildFromDateAndTime(String(dateField), String(body.startTime))
      if (dt) {
        startTime = dt.toISOString()
        const e = new Date(dt.getTime() + DEFAULT_APPOINTMENT_MINUTES * 60000)
        endTime = e.toISOString()
      }
    }

    if (!name || !email || !phone || !companyName || !brief || !startTime || !endTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!clientEmail || !privateKey) {
      return NextResponse.json(
        { error: "Google service account credentials are missing" },
        { status: 500 }
      );
    }

    if (!calendarId) {
      return NextResponse.json(
        { error: "Google Calendar ID is not set in environment variables" },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const event = {
      summary: `Booking: ${name}`,
      description: `Booked by: ${email}
Phone: ${phone}
Company: ${companyName}
Brief: ${brief}`,
      start: {
        dateTime: startTime,
        timeZone: "Asia/Colombo",
      },
      end: {
        dateTime: endTime,
        timeZone: "Asia/Colombo",
      },
    };

    const createdEvent = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: "all",
    });

    return NextResponse.json({
      message: "Event created",
      event: createdEvent.data,
    });
  } catch (err: any) {
    console.error("Error creating calendar event:", err);
    return NextResponse.json(
      { error: err.message || "Error creating event" },
      { status: 500 }
    );
  }
}
