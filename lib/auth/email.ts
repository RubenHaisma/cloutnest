import { Resend } from 'resend';
import { emailTemplates } from './email-templates';

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

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: 'CloutNest <noreply@cloutnest.com>',
    to: email,
    subject: 'Welcome to CloutNest!',
    html: emailTemplates.welcome(name),
  });
}