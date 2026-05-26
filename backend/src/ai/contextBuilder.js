import { getSupabaseAdmin } from "../config/supabase.js";

/** Load conversation history formatted for AI context */
export async function buildConversationContext(conversationId, limit = 20) {
  const supabase = getSupabaseAdmin();

  const { data: messages, error } = await supabase
    .from("messages")
    .select("sender, body, ai_generated, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return messages || [];
}

export async function getTeamAISettings(teamId) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("ai_settings")
    .select("*")
    .eq("team_id", teamId)
    .single();

  return data || {
    persona_name: "Nexus Assistant",
    model: "gpt-4o-mini",
    temperature: 0.7,
    auto_reply_enabled: true,
  };
}
