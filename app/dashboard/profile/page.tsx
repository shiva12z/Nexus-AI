"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Mail, Shield, Building2, LogOut, Save } from "lucide-react";
import {
  fetchMe,
  getStoredTeam,
  getStoredUser,
  getInitials,
  logout,
  type AuthUser,
  type AuthTeam,
} from "@/lib/auth";
import { useToast } from "@/components/dashboard/Toast";

const roleLabels: Record<string, string> = {
  admin: "Administrator",
  sales: "Sales",
  support: "Support Agent",
};

export default function ProfilePage() {
  const { showToast } = useToast();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [team, setTeam] = useState<AuthTeam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    const storedTeam = getStoredTeam();
    if (stored) setUser(stored);
    if (storedTeam) setTeam(storedTeam);

    fetchMe()
      .then((u) => setUser(u))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ color: "rgba(240,240,255,0.45)", fontSize: 14 }}>Loading profile...</div>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <p style={{ color: "rgba(240,240,255,0.5)", marginBottom: 16 }}>Not signed in</p>
        <Link href="/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 720 }}>
      <div>
        <h1
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: "#f0f0ff",
            letterSpacing: "-0.02em",
            marginBottom: 4,
          }}
        >
          Profile
        </h1>
        <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)" }}>
          Manage your account and workspace identity
        </p>
      </div>

      {/* Avatar card */}
      <div className="glass-card-elevated" style={{ padding: 28, display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(59,130,246,0.35))",
            border: "2px solid rgba(139,92,246,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 800,
            color: "#a78bfa",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          {getInitials(user.full_name)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 700, color: "#f0f0ff" }}>
            {user.full_name}
          </div>
          <div style={{ fontSize: 14, color: "rgba(240,240,255,0.5)", marginTop: 4 }}>{user.email}</div>
          <span
            style={{
              display: "inline-block",
              marginTop: 10,
              fontSize: 11.5,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 99,
              background: "rgba(139,92,246,0.12)",
              color: "#a78bfa",
              border: "1px solid rgba(139,92,246,0.25)",
              textTransform: "capitalize",
            }}
          >
            {roleLabels[user.role] || user.role}
          </span>
        </div>
        <button className="btn-secondary" onClick={logout} style={{ fontSize: 13, color: "#f87171", borderColor: "rgba(239,68,68,0.25)" }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      {/* Details */}
      <div className="glass-card-elevated" style={{ padding: 28 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#f0f0ff", marginBottom: 20 }}>Account Details</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <ProfileField icon={<User size={16} />} label="Full name" value={user.full_name} />
          <ProfileField icon={<Mail size={16} />} label="Email" value={user.email} />
          <ProfileField icon={<Shield size={16} />} label="Role" value={roleLabels[user.role] || user.role} />
          {team && (
            <ProfileField icon={<Building2 size={16} />} label="Workspace" value={team.name} />
          )}
        </div>

        <button
          className="btn-primary"
          style={{ marginTop: 24, fontSize: 13 }}
          onClick={() => showToast("Profile updates will sync when settings API is connected")}
        >
          <Save size={14} /> Save Changes
        </button>
      </div>

      <div className="glass-card-elevated" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 8 }}>Security</h2>
        <p style={{ fontSize: 13, color: "rgba(240,240,255,0.4)", marginBottom: 16, lineHeight: 1.5 }}>
          Password changes and two-factor authentication can be configured in Settings.
        </p>
        <Link href="/dashboard/settings" className="btn-secondary" style={{ fontSize: 13, display: "inline-flex" }}>
          Open Settings
        </Link>
      </div>
    </div>
  );
}

function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: "rgba(139,92,246,0.1)",
          border: "1px solid rgba(139,92,246,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a78bfa",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(240,240,255,0.4)", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 14.5, fontWeight: 500, color: "#f0f0ff" }}>{value}</div>
      </div>
    </div>
  );
}
