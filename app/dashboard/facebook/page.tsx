"use client";
import { Share2, Bot, Tag, Filter } from "lucide-react";
import { mockConversations } from "@/lib/mock-data";

const fbConversations = mockConversations.filter(c => c.channel === "facebook");

const labels = ["Support", "Sales", "Hot Lead", "Resolved", "Escalated"];
const labelColors = ["#3b82f6","#10b981","#f59e0b","rgba(240,240,255,0.3)","#ef4444"];

export default function FacebookPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(24,119,242,0.12)", border: "1px solid rgba(24,119,242,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Share2 size={22} color="#1877F2" />
        </div>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em" }}>Facebook Inbox AI</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#1877F2" }} />
            <span style={{ fontSize: 13, color: "#1877F2", fontWeight: 600 }}>Connected · NexusAI Business Page</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          { label: "Messages Today", value: "47", color: "#1877F2" },
          { label: "AI Responses",   value: "41", color: "#8b5cf6" },
          { label: "Leads",          value: "12", color: "#10b981" },
          { label: "Escalated",      value: "2",  color: "#ef4444" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 6, letterSpacing: "-0.03em" }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.45)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        {/* Messenger Inbox */}
        <div className="glass-card-elevated" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", flex: 1 }}>Messenger Inbox</h3>
            <button style={{ padding: "4px 12px", borderRadius: 7, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              <Filter size={11} /> Filter
            </button>
          </div>
          {fbConversations.concat(fbConversations).slice(0, 5).map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1877F225", border: "1px solid #1877F240", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#1877F2", flexShrink: 0 }}>
                {c.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff" }}>{c.name}</span>
                  <span style={{ fontSize: 10.5, color: "rgba(240,240,255,0.3)" }}>{c.time}</span>
                </div>
                <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.45)", marginBottom: 5 }}>{c.lastMessage}</div>
                <div style={{ display: "flex", gap: 5 }}>
                  {i % 3 === 0 && <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 99, background: "rgba(16,185,129,0.12)", color: "#34d399" }}>Sales</span>}
                  {i % 2 === 0 && <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 99, background: "rgba(139,92,246,0.12)", color: "#a78bfa" }}>AI Handled</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="glass-card-elevated" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Tag size={15} color="#1877F2" /> Conversation Labels
            </h3>
            {labels.map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: labelColors[i] }} />
                  <span style={{ fontSize: 13.5, color: "rgba(240,240,255,0.65)" }}>{label}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#f0f0ff" }}>{[12, 8, 4, 19, 2][i]}</span>
              </div>
            ))}
          </div>
          <div className="glass-card-elevated" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 14 }}>AI Support Status</h3>
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontFamily: "Space Grotesk", fontSize: 40, fontWeight: 800, color: "#10b981", marginBottom: 4 }}>87.2%</div>
              <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.4)" }}>Messages handled by AI</div>
              <div className="progress-bar-track" style={{ marginTop: 14 }}>
                <div className="progress-bar-fill" style={{ width: "87.2%", background: "linear-gradient(135deg, #1877F2, #8b5cf6)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
