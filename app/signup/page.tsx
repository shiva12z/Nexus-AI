"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Building2, ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { signup } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup({ email, password, fullName, teamName: teamName || undefined });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Start free trial"
      subtitle="Create your workspace and automate customer conversations"
      footer={
        <span style={{ color: "rgba(240,240,255,0.45)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#a78bfa", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field icon={<User size={16} color="rgba(240,240,255,0.35)" />} label="Full name">
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Sarah Kim"
            className="input-glass"
            style={inputInner}
          />
        </Field>

        <Field icon={<Building2 size={16} color="rgba(240,240,255,0.35)" />} label="Business name">
          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Acme Inc."
            className="input-glass"
            style={inputInner}
          />
        </Field>

        <Field icon={<Mail size={16} color="rgba(240,240,255,0.35)" />} label="Work email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="input-glass"
            style={inputInner}
          />
        </Field>

        <Field icon={<Lock size={16} color="rgba(240,240,255,0.35)" />} label="Password">
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            className="input-glass"
            style={inputInner}
          />
        </Field>

        {error && (
          <div style={errorBox}>{error}</div>
        )}

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", marginTop: 4, justifyContent: "center" }}>
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthShell>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(240,240,255,0.55)", display: "block", marginBottom: 7 }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "0 12px" }}>
        {icon}
        {children}
      </div>
    </div>
  );
}

const inputInner: React.CSSProperties = { flex: 1, border: "none", background: "transparent", padding: "11px 0" };
const errorBox: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  background: "rgba(239,68,68,0.1)",
  border: "1px solid rgba(239,68,68,0.25)",
  fontSize: 13,
  color: "#f87171",
};
