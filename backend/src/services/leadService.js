import { getSupabaseAdmin } from "../config/supabase.js";
import { buildConversationContext } from "../ai/contextBuilder.js";
import { extractLeadWithAI } from "../ai/replyGenerator.js";
import { extractLeadFromText } from "../utils/leadExtractor.js";
import { createNotification } from "../notifications/service.js";
import { processWorkflows } from "../workflows/engine.js";
import { emitToTeam } from "../sockets/index.js";
import { sendEmail } from "./emailService.js";

export async function captureLeadFromConversation(conversationId, teamId) {
  const supabase = getSupabaseAdmin();
  const messages = await buildConversationContext(conversationId, 30);
  const text = messages.map((m) => `${m.sender}: ${m.body}`).join("\n");

  let extracted = extractLeadFromText(text);
  try {
    const aiExtracted = await extractLeadWithAI(text);
    if (aiExtracted) extracted = { ...extracted, ...aiExtracted };
  } catch {
    // fallback to regex only
  }

  if (!extracted.email && !extracted.phone) return null;

  const { data: conv } = await supabase
    .from("conversations")
    .select("contact_name, contact_phone, contact_email, channel")
    .eq("id", conversationId)
    .single();

  if (extracted.email) {
    const { data: byEmail } = await supabase
      .from("leads")
      .select("id")
      .eq("team_id", teamId)
      .eq("email", extracted.email)
      .maybeSingle();
    if (byEmail) return byEmail;
  }

  if (extracted.phone) {
    const { data: byPhone } = await supabase
      .from("leads")
      .select("id")
      .eq("team_id", teamId)
      .eq("phone", extracted.phone)
      .maybeSingle();
    if (byPhone) return byPhone;
  }

  const { data: lead, error } = await supabase
    .from("leads")
    .insert({
      team_id: teamId,
      conversation_id: conversationId,
      name: extracted.name || conv?.contact_name,
      email: extracted.email || conv?.contact_email,
      phone: extracted.phone || conv?.contact_phone,
      source_channel: conv?.channel,
      intent: extracted.intent || "info",
      score: extracted.score || 50,
      status: "new",
    })
    .select()
    .single();

  if (error) throw error;

  await createNotification({
    teamId,
    type: "lead",
    title: `New lead from ${conv?.channel}`,
    description: `${lead.name || "Unknown"} — ${lead.intent}`,
  });

  // Send Resend email notification
  try {
    // Note: In a real app, this should query the team's admin email. Using fallback for MVP.
    const adminEmail = process.env.EMAIL_FROM || "onboarding@resend.dev"; 
    await sendEmail({
      to: adminEmail,
      subject: `New Lead Captured via ${conv?.channel || "AI"}`,
      html: `
        <h2>New Lead Alert</h2>
        <p><strong>Name:</strong> ${lead.name || "Unknown"}</p>
        <p><strong>Phone:</strong> ${lead.phone || "Not provided"}</p>
        <p><strong>Email:</strong> ${lead.email || "Not provided"}</p>
        <p><strong>Intent:</strong> ${lead.intent || "Not provided"}</p>
        <hr />
        <p><em>Captured at ${new Date().toLocaleString()}</em></p>
      `
    });
  } catch (err) {
    console.error("[leadService] Failed to send email notification", err);
  }

  emitToTeam(teamId, "lead:new", { lead });

  await processWorkflows({ teamId, trigger: "new_lead", payload: { lead } });

  await supabase.from("analytics_events").insert({
    team_id: teamId,
    event_type: "lead_captured",
    channel: conv?.channel,
    value: lead.score,
  });

  return lead;
}

export async function listLeads(teamId, { status, limit = 50, offset = 0 } = {}) {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("leads")
    .select("*, assigned:users!assigned_to(id, full_name, email)")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function updateLead(teamId, leadId, updates) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", leadId)
    .eq("team_id", teamId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
