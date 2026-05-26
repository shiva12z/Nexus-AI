"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your NexusAI workspace"
      footer={
        <span style={{ color: "rgba(240,240,255,0.45)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "#a78bfa", fontWeight: 600, textDecoration: "none" }}>
            Create one
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={labelStyle}>Email</label>
          <div style={inputWrapStyle}>
            <Mail size={16} color="rgba(240,240,255,0.35)" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="input-glass"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Password</label>
          <div style={inputWrapStyle}>
            <Lock size={16} color="rgba(240,240,255,0.35)" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-glass"
              style={inputStyle}
            />
          </div>
        </div>

        {error && (
          <div
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              fontSize: 13,
              color: "#f87171",
            }}
          >
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", marginTop: 4, justifyContent: "center" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthShell>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "rgba(240,240,255,0.55)",
  display: "block",
  marginBottom: 7,
};

const inputWrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "0 12px",
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  border: "none",
  background: "transparent",
  padding: "11px 0",
};
