import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    if (!process.env.SEND_EMAIL_TO) {
      throw new Error('SEND_EMAIL_TO is not defined');
    }

    const data = await resend.sendEmail({
      from: 'onboarding@resend.dev',
      to: process.env.SEND_EMAIL_TO,
      subject: 'Hello world',
      // eslint-disable-next-line new-cap
      react: EmailTemplate({ firstName: 'John' }) ?? undefined,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
