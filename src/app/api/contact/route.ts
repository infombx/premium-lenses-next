import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { name, company, email, phone, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'premiumlenses.mu@gmail.com',
    subject: `New Contact Form Message from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px; color: #000;">New message from Premium Lenses contact form</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; width: 120px; font-size: 13px;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; color: #000;">${name}</td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Company</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; color: #000;">${company}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px;"><a href="mailto:${email}" style="color: #000;">${email}</a></td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px;"><a href="tel:${phone}" style="color: #000;">${phone}</a></td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 24px;">
          <p style="color: #666; font-size: 13px; margin-bottom: 8px;">Message</p>
          <p style="font-size: 14px; color: #000; white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 0;">${message}</p>
        </div>
      </div>
    `,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
