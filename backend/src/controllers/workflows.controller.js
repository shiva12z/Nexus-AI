import { getSupabaseAdmin } from "../config/supabase.js";

export async function list(req, res) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .eq("team_id", req.teamId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  res.json({ success: true, data });
}

export async function create(req, res) {
  const supabase = getSupabaseAdmin();
  const { name, trigger_type, trigger_config, actions, status } = req.body;

  const { data, error } = await supabase
    .from("workflows")
    .insert({
      team_id: req.teamId,
      name,
      trigger_type,
      trigger_config: trigger_config || {},
      actions: actions || [],
      status: status || "active",
    })
    .select()
    .single();

  if (error) throw error;
  res.status(201).json({ success: true, data });
}

export async function update(req, res) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("workflows")
    .update({ ...req.body, updated_at: new Date().toISOString() })
    .eq("id", req.params.id)
    .eq("team_id", req.teamId)
    .select()
    .single();

  if (error) throw error;
  res.json({ success: true, data });
}
