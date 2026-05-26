export type AuthUser = {
  id: string;
  team_id: string;
  email: string;
  full_name: string;
  role: "admin" | "sales" | "support";
  status?: string;
};

export type AuthTeam = {
  id: string;
  name: string;
  slug?: string;
  plan?: string;
};

const TOKEN_KEY = "nexusai_token";
const USER_KEY = "nexusai_user";
const TEAM_KEY = "nexusai_team";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function getStoredTeam(): AuthTeam | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(TEAM_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthTeam;
  } catch {
    return null;
  }
}

export function setSession(token: string, user: AuthUser, team?: AuthTeam | null) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (team) localStorage.setItem(TEAM_KEY, JSON.stringify(team));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TEAM_KEY);
}

export function getInitials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      json?.error?.message || json?.message || "Request failed";
    throw new Error(message);
  }

  return json.data as T;
}

export async function login(email: string, password: string) {
  const data = await apiRequest<{
    token: string;
    user: AuthUser;
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setSession(data.token, data.user);
  return data;
}

export async function signup(payload: {
  email: string;
  password: string;
  fullName: string;
  teamName?: string;
}) {
  const data = await apiRequest<{
    token: string;
    user: AuthUser;
    team: AuthTeam;
  }>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
      teamName: payload.teamName,
    }),
  });
  setSession(data.token, data.user, data.team);
  return data;
}

export async function fetchMe(): Promise<AuthUser> {
  const data = await apiRequest<{ user: AuthUser }>("/auth/me");
  const user = data.user;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  clearSession();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}
