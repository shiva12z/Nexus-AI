import { getSupabaseAdmin } from "../config/supabase.js";

export async function list(req, res) {
  const supabase = getSupabaseAdmin();
  const { limit = 50 } = req.query;

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(parseInt(limit, 10));

  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
}
