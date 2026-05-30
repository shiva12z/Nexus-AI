import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testQuery() {
  const { data: teams } = await supabase.from('teams').select('id').limit(1);
  const teamId = teams?.[0]?.id;

  console.log("Testing with team:", teamId);

  const { data, error } = await supabase
    .from("conversations")
    .select("*, assigned:users!assigned_to(id, full_name), lead_scores(*), sentiments(*), crm_recommendations(*)")
    .eq("team_id", teamId)
    .order("last_message_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Supabase Data:", JSON.stringify(data, null, 2));
  }
}

testQuery();
