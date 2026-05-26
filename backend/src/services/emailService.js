import { Resend } from "resend";
import { config } from "../config/index.js";

const resend = new Resend(config.env === "development" ? process.env.RESEND_API_KEY : process.env.RESEND_API_KEY); // Or use config.resendKey if available

export async function sendEmail({ to, subject, html }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[emailService] RESEND_API_KEY is not set. Email not sent.");
    return false;
  }

  // Resend free tier/sandbox constraints:
  // 1. from MUST be 'onboarding@resend.dev'
  // 2. to MUST be 'shivakrishna546529@gmail.com' (the verified owner email)
  const fromEmail = "onboarding@resend.dev";
  const toEmail = "shivakrishna546529@gmail.com";

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `${subject} (Intended for: ${to})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <p style="color: #666; font-size: 12px; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">
            <strong>[Sandbox Mode Notification]</strong> This email was redirected from its original recipient (<code>${to}</code>) to your verified sandbox recipient.
          </p>
          ${html}
        </div>
      `,
    });
    
    console.log(`[emailService] Email sent successfully to ${toEmail} (redirected from ${to})`, data);
    return data;
  } catch (error) {
    console.error("[emailService] Failed to send email:", error);
    throw error;
  }
}

