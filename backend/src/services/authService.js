import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "../config/supabase.js";
import { signToken } from "../middleware/auth.js";
import { ValidationError, UnauthorizedError } from "../utils/errors.js";

export async function signup({ email, password, fullName, teamName }) {
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase.from("users").select("id").eq("email", email).maybeSingle();
  if (existing) throw new ValidationError("Email already registered");

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert({ name: teamName || `${fullName}'s Workspace`, slug: email.split("@")[0] })
    .select()
    .single();

  if (teamError) throw teamError;

  const passwordHash = await bcrypt.hash(password, 12);

  const { data: user, error: userError } = await supabase
    .from("users")
    .insert({
      team_id: team.id,
      email,
      password_hash: passwordHash,
      full_name: fullName,
      role: "admin",
      status: "online",
    })
    .select("id, team_id, email, full_name, role")
    .single();

  if (userError) throw userError;

  await supabase.from("ai_settings").insert({ team_id: team.id });

  const token = signToken({ userId: user.id, teamId: team.id, role: user.role });

  return { user, team, token };
}

export async function login({ email, password }) {
  const supabase = getSupabaseAdmin();

  const { data: user, error } = await supabase
    .from("users")
    .select("id, team_id, email, full_name, role, password_hash, status")
    .eq("email", email)
    .single();

  if (error || !user) throw new UnauthorizedError("Invalid email or password");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new UnauthorizedError("Invalid email or password");

  await supabase.from("users").update({ status: "online", last_seen_at: new Date().toISOString() }).eq("id", user.id);

  const token = signToken({ userId: user.id, teamId: user.team_id, role: user.role });
  const { password_hash, ...safeUser } = user;

  return { user: safeUser, token };
}

export async function getTeamMembers(teamId) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("users")
    .select("id, email, full_name, role, status, avatar_url, last_seen_at, created_at")
    .eq("team_id", teamId);

  if (error) throw error;
  return data;
}
