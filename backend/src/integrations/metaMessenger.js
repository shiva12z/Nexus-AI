import { config } from "../config/index.js";

const GRAPH_BASE = "https://graph.facebook.com/v19.0";

/** Send message via Meta Graph API (Instagram DM / Facebook Messenger) */
export async function sendMetaMessage(recipientId, text, platform = "messenger") {
  const token = config.meta.pageAccessToken;
  if (!token) {
    console.log(`[meta/${platform}] Mock send to ${recipientId}:`, text.slice(0, 80));
    return { message_id: "mock_" + Date.now() };
  }

  const res = await fetch(`${GRAPH_BASE}/me/messages?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
      messaging_type: "RESPONSE",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Meta API error: ${err}`);
  }

  return res.json();
}

/** Parse Meta webhook messaging event */
export function parseMetaWebhook(entry) {
  const events = [];

  for (const e of entry) {
    for (const messaging of e.messaging || []) {
      if (messaging.message?.text) {
        events.push({
          senderId: messaging.sender.id,
          recipientId: messaging.recipient.id,
          text: messaging.message.text,
          timestamp: messaging.timestamp,
          platform: "facebook",
        });
      }
    }
    for (const change of e.changes || []) {
      if (change.field === "messages" && change.value?.message?.text) {
        events.push({
          senderId: change.value.from?.id,
          text: change.value.message.text,
          platform: "instagram",
        });
      }
    }
  }

  return events;
}
