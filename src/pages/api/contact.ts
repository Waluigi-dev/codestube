import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, message } = data;

    // using nodemailer for smtp configuration like i mine dem nodes in black desert online
    const transporter = nodemailer.createTransport({
      host: 'v120744.kasserver.com',
      port: 465,
      secure: true,
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Use your authorized email as the sender
    const info = await transporter.sendMail({
      from: import.meta.env.EMAIL_USER, // sender mail
      to: import.meta.env.EMAIL_USER, // receiver mail
      subject: 'Neue Kontaktanfrage via Codestube',
      text: `Von: ${email}\nNachricht: ${message}`,
      html: `
        <h2>Neue Kontaktanfrage via Codestube</h2>
        <p><strong>Von:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email, // makes it so when reply to is pressed, the user entered mail is used. omegagenius solutions CORP GMBH AG
    });

    return new Response(
      JSON.stringify({
        message: 'Nachricht erfolgreich gesendet!',
        messageId: info.messageId,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        message: 'Fehler beim Senden: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'),
      }),
      { status: 500 }
    );
  }
}