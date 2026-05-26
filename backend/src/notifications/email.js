import { Resend } from "resend";
import { config } from "../config/index.js";

let resend = null;

function getResend() {
  if (!config.email.resendApiKey) return null;
  if (!resend) resend = new Resend(config.email.resendApiKey);
  return resend;
}

export async function sendEmail({ to, subject, html }) {
  const client = getResend();
  if (!client) {
    console.log("[email] Mock send:", { to, subject });
    return { id: "mock" };
  }

  return client.emails.send({
    from: config.email.from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });
}

export async function sendBookingConfirmationEmail(booking) {
  return sendEmail({
    to: booking.contact_email,
    subject: `Appointment confirmed — ${booking.meeting_type}`,
    html: `
      <h2>Your appointment is confirmed</h2>
      <p>Hi ${booking.contact_name},</p>
      <p>Scheduled for: <strong>${new Date(booking.scheduled_at).toLocaleString()}</strong></p>
      <p>Duration: ${booking.duration_minutes} minutes</p>
      <p>— NexusAI</p>
    `,
  });
}

export async function sendLeadAlertEmail(teamEmail, lead) {
  return sendEmail({
    to: teamEmail,
    subject: `New lead: ${lead.name || lead.email || "Unknown"}`,
    html: `<p>New lead captured from ${lead.source_channel}</p><pre>${JSON.stringify(lead, null, 2)}</pre>`,
  });
}
