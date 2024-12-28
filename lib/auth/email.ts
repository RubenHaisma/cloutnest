import { Resend } from 'resend';
import jwt from 'jsonwebtoken';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, name: string) {
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'CloutNest <noreply@cloutnest.com>',
    to: email,
    subject: 'Verify your email address',
    html: `
      <div>
        <h1>Welcome to CloutNest, ${name}!</h1>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email Address</a>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: 'CloutNest <noreply@cloutnest.com>',
    to: email,
    subject: 'Welcome to CloutNest!',
    html: `
      <div>
        <h1>Welcome aboard, ${name}!</h1>
        <p>Your email has been verified and your account is now active.</p>
        <p>Get started by completing your profile and exploring opportunities.</p>
      </div>
    `,
  });
}