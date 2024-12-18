import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMail({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  console.log('Sending email to:', process.env.CONTACT_EMAIL);
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL,
    subject: `Nieuwe aanvraag van ${name}`,
    text: `
Naam: ${name}
Email: ${email}
Telefoon: ${phone}

Bericht:
${message}
    `,
    html: `
<h2>Nieuwe aanvraag via contactformulier</h2>
<p><strong>Naam:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Telefoon:</strong> ${phone}</p>
<h3>Bericht:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}