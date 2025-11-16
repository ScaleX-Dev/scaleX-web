import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const text = await request.text();
    const body = text ? JSON.parse(text) : {};

    const {
      name = "",
      email = "",
      phone = "",
      companyName = "",
      brief = "",
      date = "",
      startTime: startTimeStr = "",
    } = body;

    if (!date || !startTimeStr) {
      return NextResponse.json({ error: "Date and startTime are required" }, { status: 400 });
    }

    // Build ISO start and end times
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = startTimeStr.split(":").map(Number);
    const startDate = new Date(year, month - 1, day, hour, minute);
    const startTime = startDate.toISOString();

    const DEFAULT_APPOINTMENT_MINUTES = Number(process.env.DEFAULT_APPOINTMENT_MINUTES || "30");
    const endDate = new Date(startDate.getTime() + DEFAULT_APPOINTMENT_MINUTES * 60000);
    const endTime = endDate.toISOString();

    const formatForEmail = (s: string) => new Date(s).toLocaleString();

    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to team
    await transporter.sendMail({
      from: `"Scalex Appointments" <${process.env.SMTP_USER}>`,
      to: "chirath@scalex.global",
      subject: "New Discovery Call Received",
      text: `You have received a new discovery call.

Contact information:
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${companyName}

Message:
${brief}

Session details:
Start time: ${formatForEmail(startTime)}
End time: ${formatForEmail(endTime)}
`,
    });

    // Optional confirmation email to user
    // await transporter.sendMail({
    //   from: `"Scalex Team" <${process.env.SMTP_USER}>`,
    //   to: email,
    //   subject: "Your Discovery Call Booking Confirmation",
    //   text: `Dear ${name},

    // Thank you for booking a discovery call with Scalex. Here are your booking details:

    // Start Time: ${formatForEmail(startTime)}
    // End Time: ${formatForEmail(endTime)}

    // We look forward to speaking with you!

    // Best regards,
    // Scalex Team
    // `,
    // });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (err: any) {
    console.error("Error sending emails:", err);
    return NextResponse.json({ error: err.message || "Error sending emails" }, { status: 500 });
  }
}