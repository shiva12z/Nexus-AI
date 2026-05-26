import { getSupabaseAdmin } from "../config/supabase.js";
import { emitToTeam } from "../sockets/index.js";

export async function createNotification({ teamId, userId, type, title, description, metadata = {} }) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      team_id: teamId,
      user_id: userId || null,
      type,
      title,
      description,
      metadata,
    })
    .select()
    .single();

  if (error) throw error;

  emitToTeam(teamId, "notification:new", data);
  return data;
}

export async function listNotifications(teamId, userId, { unreadOnly = false } = {}) {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("notifications")
    .select("*")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (userId) query = query.or(`user_id.eq.${userId},user_id.is.null`);
  if (unreadOnly) query = query.eq("read", false);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function markAllRead(teamId, userId) {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("notifications")
    .update({ read: true })
    .eq("team_id", teamId)
    .eq("read", false);
}
