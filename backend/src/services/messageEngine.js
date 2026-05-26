import { getSupabaseAdmin } from "../config/supabase.js";
import { generateAIReply } from "../ai/replyGenerator.js";
import { buildConversationContext, getTeamAISettings } from "../ai/contextBuilder.js";
import { processWorkflows } from "../workflows/engine.js";
import { createNotification } from "../notifications/service.js";
import { captureLeadFromConversation } from "./leadService.js";
import { emitToTeam } from "../sockets/index.js";
import { sendWhatsAppMessage } from "../integrations/twilioWhatsApp.js";


const CHANNEL_MAP = {
  whatsapp: "whatsapp",
  instagram: "instagram",
  facebook: "facebook",
  webchat: "webchat",
  "web-chat": "webchat",
};

export async function findOrCreateConversation({
  teamId,
  channel,
  externalId,
  contactName,
  contactPhone,
  contactEmail,
}) {
  const supabase = getSupabaseAdmin();
  const normalizedChannel = CHANNEL_MAP[channel] || channel;

  const { data: existing } = await supabase
    .from("conversations")
    .select("*")
    .eq("team_id", teamId)
    .eq("channel", normalizedChannel)
    .eq("external_id", externalId)
    .maybeSingle();

  if (existing) return existing;

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      team_id: teamId,
      channel: normalizedChannel,
      external_id: externalId,
      contact_name: contactName,
      contact_phone: contactPhone,
      contact_email: contactEmail,
      status: "active",
      ai_handled: true,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function storeMessage({
  conversationId,
  teamId,
  sender,
  body,
  channel,
  aiGenerated = false,
  externalId = null,
  senderUserId = null,
}) {
  const supabase = getSupabaseAdmin();

  const { data: message, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      team_id: teamId,
      sender,
      body,
      channel,
      ai_generated: aiGenerated,
      external_id: externalId,
      sender_user_id: senderUserId,
      status: "sent",
    })
    .select()
    .single();

  if (error) throw error;

  await supabase
    .from("conversations")
    .update({ last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  emitToTeam(teamId, "message:new", { message, conversationId });

  await supabase.from("analytics_events").insert({
    team_id: teamId,
    event_type: "message_received",
    channel,
    metadata: { sender, ai_generated: aiGenerated },
  });

  return message;
}

/**
 * Core inbound pipeline: store → AI reply → lead capture → workflows → notify
 */
export async function handleInboundMessage({
  teamId,
  channel,
  externalId,
  contactName,
  contactPhone,
  contactEmail,
  messageBody,
  messageExternalId,
  sendReplyFn,
}) {
  const conversation = await findOrCreateConversation({
    teamId,
    channel,
    externalId,
    contactName,
    contactPhone,
    contactEmail,
  });

  const userMessage = await storeMessage({
    conversationId: conversation.id,
    teamId,
    sender: "user",
    body: messageBody,
    channel: conversation.channel,
    externalId: messageExternalId,
  });

  const aiSettings = await getTeamAISettings(teamId);
  let aiMessage = null;

  if (aiSettings.auto_reply_enabled && conversation.status !== "human") {
    const history = await buildConversationContext(conversation.id);
    const { data: team } = await getSupabaseAdmin().from("teams").select("name").eq("id", teamId).single();

    const aiResult = await generateAIReply({
      teamId,
      messages: history,
      aiSettings,
      businessName: team?.name,
    });

    if (aiResult.shouldEscalate) {
      await getSupabaseAdmin()
        .from("conversations")
        .update({ status: "human", ai_handled: false })
        .eq("id", conversation.id);

      await storeMessage({
        conversationId: conversation.id,
        teamId,
        sender: "system",
        body: "AI handed off to human agent — low confidence response",
        channel: conversation.channel,
      });

      await createNotification({
        teamId,
        type: "human",
        title: "Human intervention required",
        description: `Low AI confidence for ${contactName || externalId}`,
      });
    } else if (sendReplyFn) {
      await sendReplyFn(aiResult.reply);
    }

    aiMessage = await storeMessage({
      conversationId: conversation.id,
      teamId,
      sender: "ai",
      body: aiResult.reply,
      channel: conversation.channel,
      aiGenerated: true,
    });
  }

  await captureLeadFromConversation(conversation.id, teamId);

  await processWorkflows({
    teamId,
    trigger: "message_received",
    payload: { conversation, message: userMessage },
  });

  return { conversation, userMessage, aiMessage };
}

export async function sendAgentMessage({ conversationId, teamId, userId, body }) {
  const supabase = getSupabaseAdmin();
  const { data: conv } = await supabase.from("conversations").select("channel, external_id").eq("id", conversationId).single();
  if (!conv) throw new Error("Conversation not found");

  // Actually dispatch to the external service (e.g. Twilio WhatsApp)
  let externalId = null;
  if (conv.channel === "whatsapp") {
    try {
      const sent = await sendWhatsAppMessage(conv.external_id, body);
      externalId = sent?.sid || null;
    } catch (err) {
      console.error("[sendAgentMessage] Failed to send WhatsApp message via Twilio:", err);
      throw new Error(`Failed to deliver WhatsApp message: ${err.message}`);
    }
  }

  return storeMessage({
    conversationId,
    teamId,
    sender: "agent",
    body,
    channel: conv.channel,
    senderUserId: userId,
    externalId,
  });
}
