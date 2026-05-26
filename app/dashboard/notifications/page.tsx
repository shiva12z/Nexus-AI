"use client";
import { mockNotifications } from "@/lib/mock-data";
import type { ReactElement } from "react";
import { Bell, Calendar, UserPlus, Bot, AlertTriangle, Check, Trash2, Settings } from "lucide-react";

const typeConfig: Record<string, { color: string; bg: string; icon: ReactElement }> = {
  lead:    { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",   icon: <UserPlus size={15} /> },
  booking: { color: "#10b981", bg: "rgba(16,185,129,0.12)",   icon: <Calendar size={15} /> },
  human:   { color: "#ef4444", bg: "rgba(239,68,68,0.12)",    icon: <AlertTriangle size={15} /> },
  ai:      { color: "#8b5cf6", bg: "rgba(139,92,246,0.12)",   icon: <Bot size={15} /> },
};

export default function NotificationsPage() {
  const unread = mockNotifications.filter(n => !n.read);
  const read = mockNotifications.filter(n => n.read);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em", marginBottom: 4 }}>
            Notifications
          </h1>
          <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)" }}>
            {unread.length} unread · {mockNotifications.length} total
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary" style={{ fontSize: 12, padding: "7px 14px" }}><Check size={13} /> Mark All Read</button>
          <button className="btn-secondary" style={{ fontSize: 12, padding: "7px 14px" }}><Settings size={13} /> Preferences</button>
        </div>
      </div>

      {/* Notification Settings Card */}
      <div className="glass-card-elevated" style={{ padding: 22 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 16 }}>Notification Channels</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Email Notifications",   desc: "Sent to sarah@nexusai.com", enabled: true },
            { label: "Browser Notifications",  desc: "Push alerts in browser",   enabled: true },
            { label: "In-App Notifications",   desc: "Bell icon in dashboard",   enabled: true },
          ].map(ch => (
            <div key={ch.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff", marginBottom: 3 }}>{ch.label}</div>
                <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>{ch.desc}</div>
              </div>
              <div style={{
                width: 40, height: 22, borderRadius: 99,
                background: ch.enabled ? "linear-gradient(135deg, #8b5cf6, #3b82f6)" : "rgba(255,255,255,0.1)",
                position: "relative", cursor: "pointer", flexShrink: 0,
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", background: "white",
                  position: "absolute", top: 3, left: ch.enabled ? 21 : 3,
                  transition: "left 0.2s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unread */}
      {unread.length > 0 && (
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "rgba(240,240,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
            Unread ({unread.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {unread.map(n => {
              const cfg = typeConfig[n.type] || typeConfig.ai;
              return (
                <div key={n.id} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 20px", borderRadius: 12,
                  background: "rgba(139,92,246,0.06)",
                  border: "1px solid rgba(139,92,246,0.15)",
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, background: cfg.bg,
                    border: `1px solid ${cfg.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: cfg.color, flexShrink: 0,
                  }}>
                    {cfg.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0ff", marginBottom: 2 }}>{n.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(240,240,255,0.55)" }}>{n.desc}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "rgba(240,240,255,0.3)" }}>{n.time}</span>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#8b5cf6" }} />
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,240,255,0.25)", padding: 4 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Read */}
      <div>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "rgba(240,240,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          Earlier
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {read.map(n => {
            const cfg = typeConfig[n.type] || typeConfig.ai;
            return (
              <div key={n.id} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "12px 18px", borderRadius: 10,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9, background: cfg.bg + "80",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: cfg.color, opacity: 0.6, flexShrink: 0,
                }}>
                  {cfg.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "rgba(240,240,255,0.6)", marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.35)" }}>{n.desc}</div>
                </div>
                <span style={{ fontSize: 11.5, color: "rgba(240,240,255,0.25)" }}>{n.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
