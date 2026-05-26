import { createClient } from "@supabase/supabase-js";
import { config } from "./index.js";

let supabaseAdmin = null;
let cachedUrl = null;

export function getSupabaseAdmin() {
  const url = config.supabase.url;
  const key = config.supabase.serviceRoleKey;

  if (!url || !key) {
    throw new Error("Supabase credentials not configured in backend/.env");
  }

  // Recreate client if URL changed (e.g. after .env update + server restart)
  if (!supabaseAdmin || cachedUrl !== url) {
    cachedUrl = url;
    supabaseAdmin = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return supabaseAdmin;
}

export function getSupabaseClient(accessToken) {
  const client = createClient(config.supabase.url, config.supabase.anonKey);
  if (accessToken) {
    client.auth.setSession({ access_token: accessToken, refresh_token: "" });
  }
  return client;
}

export default getSupabaseAdmin;
