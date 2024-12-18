import { Resend } from 'resend';
import { emailTemplates } from './email-templates';
import jwt from 'jsonwebtoken';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, name: string, token: string) {
  const confirmLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'CloutNest <noreply@cloutnest.com>',
    to: email,
    subject: 'Verify your CloutNest account',
    html: emailTemplates.verification(name, confirmLink),
  });
}

export async function sendWelcomeEmail(user: { email: string; name: string }) {
  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const confirmLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'CloutNest <noreply@cloutnest.com>',
    to: user.email,
    subject: 'Verify your CloutNest account',
    html: emailTemplates.verification(user.name, confirmLink),
  });
}
