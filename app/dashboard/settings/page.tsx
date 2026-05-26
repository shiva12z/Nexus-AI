"use client";
import { Settings, Key, Link2, Bot, Palette, Bell, CreditCard, Save, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/dashboard/Toast";

const tabs = [
  { id: "general",       label: "General",          icon: <Settings size={15} /> },
  { id: "channels",      label: "Connected Channels",icon: <Link2 size={15} /> },
  { id: "ai",            label: "AI Settings",       icon: <Bot size={15} /> },
  { id: "branding",      label: "Branding",          icon: <Palette size={15} /> },
  { id: "notifications", label: "Notifications",     icon: <Bell size={15} /> },
  { id: "billing",       label: "Billing",           icon: <CreditCard size={15} /> },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [aiTemp, setAiTemp] = useState(0.7);
  const { showToast } = useToast();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em", marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)" }}>Manage your workspace, AI configuration, and billing</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 220px) 1fr", gap: 24 }} className="settings-layout">
        {/* Sidebar Nav */}
        <div className="glass-card-elevated" style={{ padding: 14, height: "fit-content" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 8, fontSize: 13.5, fontWeight: 500,
              cursor: "pointer", marginBottom: 3, textAlign: "left",
              background: activeTab === tab.id ? "rgba(139,92,246,0.12)" : "transparent",
              border: activeTab === tab.id ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
              color: activeTab === tab.id ? "#a78bfa" : "rgba(240,240,255,0.55)",
            }}>
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="glass-card-elevated" style={{ padding: 28 }}>
          {/* GENERAL */}
          {activeTab === "general" && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#f0f0ff", marginBottom: 24 }}>General Settings</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Workspace Name", value: "NexusAI Production", type: "text" },
                  { label: "Business Email",  value: "sarah@nexusai.com",  type: "email" },
                  { label: "Timezone",        value: "UTC+5:30 (IST)",     type: "select" },
                  { label: "Language",        value: "English (US)",        type: "select" },
                ].map(field => (
                  <div key={field.label}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(240,240,255,0.6)", display: "block", marginBottom: 7 }}>{field.label}</label>
                    <input
                      defaultValue={field.value}
                      type={field.type !== "select" ? field.type : "text"}
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: 9, padding: "10px 14px", fontSize: 14, color: "#f0f0ff", outline: "none",
                      }}
                    />
                  </div>
                ))}
                <button className="btn-primary" style={{ alignSelf: "flex-start", fontSize: 13 }} onClick={() => showToast("General settings saved successfully")}>
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {/* AI SETTINGS */}
          {activeTab === "ai" && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#f0f0ff", marginBottom: 24 }}>AI Configuration</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(240,240,255,0.6)", display: "block", marginBottom: 7 }}>AI Model</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["GPT-4o", "GPT-4 Turbo", "Claude 3.5"].map(model => (
                      <button key={model} style={{
                        padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                        background: model === "GPT-4o" ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
                        border: model === "GPT-4o" ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.08)",
                        color: model === "GPT-4o" ? "#a78bfa" : "rgba(240,240,255,0.5)",
                      }}>{model}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(240,240,255,0.6)", display: "block", marginBottom: 7 }}>
                    Temperature: <span style={{ color: "#a78bfa" }}>{aiTemp}</span>
                  </label>
                  <input type="range" min="0" max="1" step="0.1" value={aiTemp} onChange={e => setAiTemp(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#8b5cf6" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(240,240,255,0.3)", marginTop: 4 }}>
                    <span>Precise (0)</span><span>Creative (1)</span>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(240,240,255,0.6)", display: "block", marginBottom: 7 }}>AI Persona Name</label>
                  <input defaultValue="Nexus Assistant" style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 9, padding: "10px 14px", fontSize: 14, color: "#f0f0ff", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(240,240,255,0.6)", display: "block", marginBottom: 7 }}>System Prompt</label>
                  <textarea rows={5} defaultValue="You are a helpful customer service assistant for {business_name}. Be concise, friendly, and professional. Always try to capture lead information when relevant." style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 9, padding: "10px 14px", fontSize: 13.5, color: "#f0f0ff", outline: "none", resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  {[
                    { label: "Escalation Sensitivity", options: ["Low","Medium","High"], selected: "Medium" },
                    { label: "Response Language", options: ["Auto-detect","English","Spanish"], selected: "Auto-detect" },
                  ].map(sel => (
                    <div key={sel.label} style={{ flex: 1 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(240,240,255,0.6)", display: "block", marginBottom: 7 }}>{sel.label}</label>
                      <div style={{ display: "flex", gap: 6 }}>
                        {sel.options.map(opt => (
                          <button key={opt} style={{ flex: 1, padding: "7px 10px", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", background: opt === sel.selected ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)", border: opt === sel.selected ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.07)", color: opt === sel.selected ? "#a78bfa" : "rgba(240,240,255,0.5)" }}>{opt}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-primary" style={{ alignSelf: "flex-start", fontSize: 13 }} onClick={() => showToast("AI configuration saved successfully")}><Save size={14} /> Save AI Config</button>
              </div>
            </div>
          )}

          {/* BILLING */}
          {activeTab === "billing" && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#f0f0ff", marginBottom: 24 }}>Billing & Plan</h2>
              <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.08))", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 14, padding: 24, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Current Plan</div>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.03em" }}>Growth</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 32, fontWeight: 800, color: "#f0f0ff" }}>$149<span style={{ fontSize: 16, fontWeight: 500, color: "rgba(240,240,255,0.5)" }}>/mo</span></div>
                    <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>Next billing: Jun 24, 2026</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  {[{ label: "Conversations", used: "7,841", limit: "10,000" }, { label: "AI Minutes", used: "312", limit: "500" }, { label: "Team Members", used: "4", limit: "10" }].map(u => (
                    <div key={u.label} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)", marginBottom: 6 }}>{u.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 6 }}>{u.used} / {u.limit}</div>
                      <div className="progress-bar-track" style={{ height: 4 }}>
                        <div className="progress-bar-fill" style={{ width: `${(parseInt(u.used.replace(/,/g,"")) / parseInt(u.limit.replace(/,/g,""))) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-primary" style={{ fontSize: 13 }}>Upgrade to Enterprise</button>
                <button className="btn-secondary" style={{ fontSize: 13 }}>Manage Payment Method</button>
                <button className="btn-secondary" style={{ fontSize: 13, color: "rgba(239,68,68,0.7)", borderColor: "rgba(239,68,68,0.2)" }}>Cancel Plan</button>
              </div>
            </div>
          )}

          {/* CHANNELS */}
          {activeTab === "channels" && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#f0f0ff", marginBottom: 24 }}>Connected Channels</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { name: "WhatsApp Business",   color: "#25D366", status: "Connected", phone: "+1 555 0100" },
                  { name: "Instagram",            color: "#E1306C", status: "Connected", phone: "@nexusai_business" },
                  { name: "Facebook Messenger",   color: "#1877F2", status: "Connected", phone: "NexusAI Business Page" },
                  { name: "Web Chat Widget",      color: "#8b5cf6", status: "Connected", phone: "nexusai.io" },
                ].map(ch => (
                  <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "14px 18px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: ch.color + "18", border: `1px solid ${ch.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: ch.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0ff" }}>{ch.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>{ch.phone}</div>
                    </div>
                    <span style={{ fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}>● {ch.status}</span>
                    <button style={{ padding: "6px 14px", borderRadius: 7, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,255,0.5)", cursor: "pointer" }}>Configure</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Default tab content for branding/notifications */}
          {(activeTab === "branding" || activeTab === "notifications") && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{activeTab === "branding" ? "🎨" : "🔔"}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f0f0ff", marginBottom: 8 }}>
                {activeTab === "branding" ? "Branding Settings" : "Notification Preferences"}
              </h3>
              <p style={{ fontSize: 14, color: "rgba(240,240,255,0.4)", maxWidth: 360, margin: "0 auto" }}>
                Customize your {activeTab === "branding" ? "brand colors, logo, and chat widget appearance" : "email, push, and in-app notification rules"}.
              </p>
              <button className="btn-primary" style={{ marginTop: 24, fontSize: 13 }} onClick={() => showToast(`${activeTab === "branding" ? "Branding" : "Notification"} preferences saved`)}>Configure {activeTab === "branding" ? "Branding" : "Notifications"}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
