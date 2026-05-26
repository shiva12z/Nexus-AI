import twilio from "twilio";
import { config } from "../config/index.js";

let client = null;

function getTwilio() {
  if (!config.twilio.accountSid || !config.twilio.authToken) {
    return null;
  }
  if (!client) {
    client = twilio(config.twilio.accountSid, config.twilio.authToken);
  }
  return client;
}

export async function sendWhatsAppMessage(to, body) {
  const twilioClient = getTwilio();
  
  // Format markdown bold: convert **bold** to *bold* for WhatsApp compatibility
  const formattedBody = body ? body.replace(/\*\*(.*?)\*\*/g, "*$1*") : body;

  if (!twilioClient) {
    console.log("[whatsapp] Mock send to", to, ":", formattedBody.slice(0, 80));
    return { sid: "mock_" + Date.now() };
  }

  const message = await twilioClient.messages.create({
    from: config.twilio.whatsappFrom,
    to: to.startsWith("whatsapp:") ? to : `whatsapp:${to}`,
    body: formattedBody,
  });

  return message;
}

export function parseTwilioWebhook(body) {
  return {
    from: body.From?.replace("whatsapp:", ""),
    to: body.To,
    body: body.Body || "",
    messageSid: body.MessageSid,
    profileName: body.ProfileName,
  };
}
