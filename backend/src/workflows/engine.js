import { getSupabaseAdmin } from "../config/supabase.js";
import { sendEmail } from "../notifications/email.js";
import { exportLeadToSheets } from "../integrations/googleSheets.js";

const ACTION_HANDLERS = {
  send_email: async (action, context) => {
    await sendEmail({
      to: action.to,
      subject: action.subject || "NexusAI Workflow",
      html: action.body || JSON.stringify(context.payload),
    });
  },

  assign_agent: async (action, context) => {
    const supabase = getSupabaseAdmin();
    const conversationId = context.payload?.conversation?.id;
    if (!conversationId) return;

    await supabase
      .from("conversations")
      .update({ assigned_to: action.userId, status: "human" })
      .eq("id", conversationId);
  },

  notify_team: async (action, context) => {
    const supabase = getSupabaseAdmin();
    await supabase.from("notifications").insert({
      team_id: context.teamId,
      type: "system",
      title: action.title || "Workflow triggered",
      description: action.description || "",
    });
  },

  export_to_sheets: async (_action, context) => {
    if (context.payload?.lead) {
      await exportLeadToSheets(context.teamId, context.payload.lead);
    }
  },

  set_lead_status: async (action, context) => {
    if (!context.payload?.lead?.id) return;
    const supabase = getSupabaseAdmin();
    await supabase
      .from("leads")
      .update({ status: action.status })
      .eq("id", context.payload.lead.id);
  },
};

export async function processWorkflows({ teamId, trigger, payload }) {
  const supabase = getSupabaseAdmin();

  const { data: workflows } = await supabase
    .from("workflows")
    .select("*")
    .eq("team_id", teamId)
    .eq("status", "active")
    .eq("trigger_type", trigger);

  for (const workflow of workflows || []) {
    const actions = workflow.actions || [];
    for (const action of actions) {
      const handler = ACTION_HANDLERS[action.type];
      if (handler) {
        try {
          await handler(action, { teamId, trigger, payload });
        } catch (err) {
          console.error(`[workflow] ${workflow.name} action failed:`, err.message);
        }
      }
    }

    await supabase
      .from("workflows")
      .update({ run_count: (workflow.run_count || 0) + 1 })
      .eq("id", workflow.id);
  }
}
