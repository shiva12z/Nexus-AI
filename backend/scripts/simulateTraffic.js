import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSimulation() {
  console.log("Seeding Demo Data...");

  const { data: teams, error: teamsError } = await supabase.from('teams').select('id');

  if (teamsError || !teams || teams.length === 0) {
    console.error("No teams found. Please ensure a team exists before running this script.");
    return;
  }
  const teamIds = teams.map(t => t.id);

  // Conversations
  const convos = [
    { contact_name: "Alice Johnson", channel: "webchat", external_id: "web-alice", message: "Hi, I'm looking for a pricing demo." },
    { contact_name: "Bob Smith", channel: "whatsapp", external_id: "wa-bob", message: "Your product is exactly what we need right now." },
    { contact_name: "Diana Prince", channel: "instagram", external_id: "ig-diana", message: "Can we schedule a call for tomorrow at 2 PM?" }
  ];

  for (const teamId of teamIds) {
    for (const c of convos) {
      const { data: conversation, error: convError } = await supabase.from('conversations').upsert([{
        team_id: teamId,
        contact_name: c.contact_name,
        channel: c.channel,
        external_id: c.external_id + '-' + teamId.substring(0, 5),
        status: 'active'
      }], { onConflict: 'team_id,channel,external_id' }).select().single();

      if (convError) {
        console.error("Error inserting conversation:", convError);
        continue;
      }
      const cid = conversation.id;

      // Insert the first message
      await supabase.from('messages').insert([{
        conversation_id: cid,
        team_id: teamId,
        sender: 'user',
        body: c.message,
        channel: c.channel
      }]);

      // Insert AI metadata directly into the JSON blob
      if (c.contact_name === "Alice Johnson") {
        const crmRec = { recommendation: "Schedule Demo", priority: "High", reason: "Requested pricing demo" };
        await supabase.from('conversations').update({
          metadata: {
            ai_score: 92,
            ai_intent: "high",
            ai_sentiment: "positive",
            ai_next_action: crmRec.recommendation,
            ai_reason: crmRec.reason
          }
        }).eq('id', cid);
        
        await supabase.from('leads').insert([{ team_id: teamId, conversation_id: cid, name: "Alice Johnson", source_channel: "webchat", intent: "High Intent", score: 92 }]);
      }
      
      if (c.contact_name === "Diana Prince") {
        const crmRec = { recommendation: "Confirm Appointment", priority: "High", reason: "Ready to book" };
        await supabase.from('conversations').update({
          metadata: {
            ai_score: 95,
            ai_intent: "high",
            ai_sentiment: "urgent",
            ai_next_action: crmRec.recommendation,
            ai_reason: crmRec.reason
          }
        }).eq('id', cid);

        await supabase.from('bookings').insert([{ team_id: teamId, contact_name: "Diana Prince", contact_email: "diana@example.com", contact_phone: "555-0192", scheduled_at: new Date(Date.now() + 86400000).toISOString(), status: "confirmed" }]);
        await supabase.from('leads').insert([{ team_id: teamId, conversation_id: cid, name: "Diana Prince", source_channel: "instagram", intent: "Ready to Buy", score: 95 }]);
      }
    }
  }

  console.log("Demo data seeded successfully.");
}

runSimulation();
