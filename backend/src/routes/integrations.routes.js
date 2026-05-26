import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import { getSupabaseAdmin } from "../config/supabase.js";
import { handleInboundMessage } from "../services/messageEngine.js";

const router = Router();

// Unauthenticated endpoint for local/hackathon simulation
router.post("/simulate", asyncHandler(async (req, res) => {
  const { channel, sender, message } = req.body;
  if (!channel || !sender || !message) {
    return res.status(400).json({ error: "Missing required fields: channel, sender, message" });
  }

  const teamId = process.env.DEFAULT_TEAM_ID;
  if (!teamId) return res.status(500).json({ error: "DEFAULT_TEAM_ID not configured" });

  await handleInboundMessage({
    teamId,
    channel: channel,
    externalId: sender,
    contactName: sender,
    messageBody: message,
    sendReplyFn: async (reply) => {
      console.log(`[Simulated ${channel} Reply to ${sender}]: ${reply}`);
    },
  });

  res.json({ success: true, message: "Simulated lead processed" });
}));

router.use(authenticate);

router.get("/", asyncHandler(async (req, res) => {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("integrations").select("id, provider, status, config, last_sync_at").eq("team_id", req.teamId);
  res.json({ success: true, data });
}));

router.post("/:provider/connect", asyncHandler(async (req, res) => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("integrations")
    .upsert({
      team_id: req.teamId,
      provider: req.params.provider,
      status: "connected",
      config: req.body.config || {},
      updated_at: new Date().toISOString(),
    }, { onConflict: "team_id,provider" })
    .select()
    .single();

  if (error) throw error;
  res.json({ success: true, data });
}));

export default router;
