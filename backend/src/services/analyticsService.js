import { getSupabaseAdmin } from "../config/supabase.js";

export async function getDashboardStats(teamId, days = 30) {
  const supabase = getSupabaseAdmin();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const [
    { count: totalConversations },
    { count: totalMessages },
    { count: totalLeads },
    { count: totalBookings },
    { data: channelBreakdown },
    { data: recentEvents },
  ] = await Promise.all([
    supabase.from("conversations").select("*", { count: "exact", head: true }).eq("team_id", teamId),
    supabase.from("messages").select("*", { count: "exact", head: true }).eq("team_id", teamId).gte("created_at", since.toISOString()),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("team_id", teamId).gte("created_at", since.toISOString()),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("team_id", teamId).gte("created_at", since.toISOString()),
    supabase.from("conversations").select("channel").eq("team_id", teamId),
    supabase.from("analytics_events").select("*").eq("team_id", teamId).gte("created_at", since.toISOString()).order("created_at", { ascending: false }).limit(100),
  ]);

  const aiMessages = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("team_id", teamId)
    .eq("ai_generated", true)
    .gte("created_at", since.toISOString());

  const aiRate = totalMessages > 0
    ? ((aiMessages.count || 0) / totalMessages * 100).toFixed(1)
    : "0";

  const channels = {};
  for (const row of channelBreakdown || []) {
    channels[row.channel] = (channels[row.channel] || 0) + 1;
  }

  const convertedLeads = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("team_id", teamId)
    .eq("status", "converted");

  const conversionRate = totalLeads > 0
    ? ((convertedLeads.count || 0) / totalLeads * 100).toFixed(1)
    : "0";

  return {
    totalConversations: totalConversations || 0,
    totalMessages: totalMessages || 0,
    totalLeads: totalLeads || 0,
    totalBookings: totalBookings || 0,
    aiResponseRate: `${aiRate}%`,
    leadConversionRate: `${conversionRate}%`,
    channelBreakdown: channels,
    periodDays: days,
  };
}

export async function getMessageVolumeByDay(teamId, days = 7) {
  const supabase = getSupabaseAdmin();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data } = await supabase
    .from("messages")
    .select("created_at, channel")
    .eq("team_id", teamId)
    .gte("created_at", since.toISOString());

  const byDay = {};
  for (const msg of data || []) {
    const day = new Date(msg.created_at).toLocaleDateString("en-US", { weekday: "short" });
    if (!byDay[day]) byDay[day] = { day, whatsapp: 0, instagram: 0, facebook: 0, webchat: 0 };
    const ch = msg.channel === "webchat" ? "webchat" : msg.channel;
    if (byDay[day][ch] !== undefined) byDay[day][ch]++;
  }

  return Object.values(byDay);
}
