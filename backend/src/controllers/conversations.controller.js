import { getSupabaseAdmin } from "../config/supabase.js";
import { sendAgentMessage } from "../services/messageEngine.js";
import { NotFoundError } from "../utils/errors.js";

export async function list(req, res) {
  const supabase = getSupabaseAdmin();
  const { status, channel, limit = 50 } = req.query;

  let query = supabase
    .from("conversations")
    .select("*, assigned:users!assigned_to(id, full_name)")
    .eq("team_id", req.teamId)
    .order("last_message_at", { ascending: false })
    .limit(parseInt(limit, 10));

  if (status) query = query.eq("status", status);
  if (channel) query = query.eq("channel", channel);

  const { data, error } = await query;
  if (error) throw error;
  res.json({ success: true, data });
}

export async function getById(req, res) {
  const supabase = getSupabaseAdmin();
  const { data: conversation, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("id", req.params.id)
    .eq("team_id", req.teamId)
    .single();

  if (error || !conversation) throw new NotFoundError("Conversation");

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true });

  res.json({ success: true, data: { conversation, messages } });
}

export async function sendMessage(req, res) {
  const { body } = req.body;
  const message = await sendAgentMessage({
    conversationId: req.params.id,
    teamId: req.teamId,
    userId: req.user.id,
    body,
  });
  res.status(201).json({ success: true, data: message });
}

export async function assign(req, res) {
  const supabase = getSupabaseAdmin();
  const { userId, status } = req.body;

  const { data, error } = await supabase
    .from("conversations")
    .update({
      assigned_to: userId,
      status: status || "human",
      ai_handled: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", req.params.id)
    .eq("team_id", req.teamId)
    .select()
    .single();

  if (error) throw error;
  res.json({ success: true, data });
}

export async function updateStatus(req, res) {
  const supabase = getSupabaseAdmin();
  const { status } = req.body;

  const { data, error } = await supabase
    .from("conversations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", req.params.id)
    .eq("team_id", req.teamId)
    .select()
    .single();

  if (error) throw error;
  res.json({ success: true, data });
}
