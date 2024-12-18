import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Handle POST requests
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { name, email, message } = await req.json();

    // Validate the inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a Nodemailer transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender's name and email
      to: "contact@playlistpro.io", // Recipient email
      subject: `Support Request from ${name}`,
      text: message, // Plain text body
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
