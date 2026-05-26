"use client";
import { mockConversations } from "@/lib/mock-data";
import { Bot, MessageCircle, Zap, BarChart2, Settings2, RefreshCw } from "lucide-react";
import { useState } from "react";

const waConversations = mockConversations.filter(c => c.channel === "whatsapp");

const stats = [
  { label: "Active Conversations", value: "284", color: "#25D366" },
  { label: "AI Handled Today",     value: "192", color: "#8b5cf6" },
  { label: "Leads Captured",       value: "67",  color: "#3b82f6" },
  { label: "Bookings via WA",      value: "23",  color: "#f59e0b" },
];

export default function WhatsAppPage() {
  const [selected, setSelected] = useState(waConversations[0]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <MessageCircle size={22} color="#25D366" />
        </div>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em" }}>
            WhatsApp Automation
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#25D366" }} />
            <span style={{ fontSize: 13, color: "#25D366", fontWeight: 600 }}>Connected via Twilio · +1 555 0100</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button className="btn-secondary" style={{ fontSize: 12, padding: "8px 14px" }}><Settings2 size={13} /> Settings</button>
          <button className="btn-primary" style={{ fontSize: 12, padding: "8px 14px" }}><Zap size={13} /> New Broadcast</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 32, fontWeight: 800, color: s.color, letterSpacing: "-0.03em", marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.45)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* AI Config */}
      <div className="glass-card-elevated" style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Bot size={18} color="#8b5cf6" />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff" }}>AI Auto-Reply Configuration</h3>
          </div>
          <span className="badge badge-green">Active</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { label: "Response Mode", value: "AI First", desc: "AI handles all messages first" },
            { label: "Escalation Trigger", value: "Negative Sentiment", desc: "Auto-route to human agent" },
            { label: "Lead Detection", value: "Enabled", desc: "AI scores intent automatically" },
          ].map(cfg => (
            <div key={cfg.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 11, color: "rgba(240,240,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{cfg.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>{cfg.value}</div>
              <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>{cfg.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Replies */}
      <div className="glass-card-elevated" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 16 }}>Quick Reply Templates</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { name: "Welcome Message",   preview: "Hi! 👋 Thanks for reaching out to {{business_name}}. How can I help you today?", uses: 847 },
            { name: "Appointment Confirm", preview: "Your appointment is confirmed for {{date}} at {{time}}. You'll receive a reminder 1 hour before.", uses: 423 },
            { name: "Follow-Up",         preview: "Hi {{name}}, just following up on your inquiry. Have you had a chance to review our proposal?", uses: 312 },
            { name: "Out of Hours",      preview: "Thanks for your message! We're currently offline. Our hours are {{hours}}. We'll reply ASAP!", uses: 289 },
          ].map(tpl => (
            <div key={tpl.name} style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff", marginBottom: 3 }}>{tpl.name}</div>
                <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tpl.preview}</div>
              </div>
              <div style={{ fontSize: 12, color: "rgba(240,240,255,0.3)", whiteSpace: "nowrap" }}>{tpl.uses.toLocaleString()} uses</div>
              <button style={{ padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 600, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa", cursor: "pointer" }}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
