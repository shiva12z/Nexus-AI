import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  console.log("Checking conversations...");
  const { data: convs, error: cErr } = await supabase.from('conversations').select('*');
  console.log("Conversations:", convs, cErr);

  console.log("Checking messages...");
  const { data: msgs, error: mErr } = await supabase.from('messages').select('*');
  console.log("Messages:", msgs, mErr);
}

check();
