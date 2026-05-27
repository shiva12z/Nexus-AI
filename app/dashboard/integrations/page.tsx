"use client";
import { Plug, MessageCircle, Camera, Share2, Globe, Database, Mail, BarChart3, CheckCircle, Plus, ExternalLink, Key, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/dashboard/Toast";

const integrations = [
  { name: "WhatsApp Business",  icon: <MessageCircle size={22} />, color: "#25D366", status: "connected", desc: "Twilio API · +1 555 0100", category: "Messaging" },
  { name: "Instagram",          icon: <Camera size={22} />,     color: "#E1306C", status: "connected", desc: "Meta Graph API · @nexusai_business", category: "Messaging" },
  { name: "Facebook Messenger", icon: <Share2 size={22} />,      color: "#1877F2", status: "connected", desc: "Meta Graph API · Business Page", category: "Messaging" },
  { name: "Web Chat Widget",    icon: <Globe size={22} />,          color: "#8b5cf6", status: "connected", desc: "Embedded on nexusai.io", category: "Messaging" },
  { name: "OpenAI",             icon: <span style={{fontSize:18}}>🤖</span>, color: "#10b981", status: "connected", desc: "GPT-4o · 1.2M tokens used", category: "AI" },
  { name: "Google Sheets",      icon: <span style={{fontSize:18}}>📊</span>, color: "#34d399", status: "connected", desc: "Auto-sync leads every 15 min", category: "CRM" },
  { name: "HubSpot",            icon: <span style={{fontSize:18}}>🔶</span>, color: "#f97316", status: "available", desc: "Sync contacts & deals", category: "CRM" },
  { name: "Salesforce",         icon: <span style={{fontSize:18}}>☁️</span>, color: "#00A1E0", status: "available", desc: "Enterprise CRM sync", category: "CRM" },
  { name: "Resend",             icon: <Mail size={22} />,           color: "#ec4899", status: "connected", desc: "Email notifications · 240 sent", category: "Email" },
  { name: "Supabase",           icon: <Database size={22} />,       color: "#3ecf8e", status: "connected", desc: "Database & realtime", category: "Database" },
  { name: "Zapier",             icon: <span style={{fontSize:18}}>⚡</span>, color: "#FF4A00", status: "available", desc: "Connect 5000+ apps", category: "Automation" },
  { name: "Google Analytics",   icon: <BarChart3 size={22} />,      color: "#f59e0b", status: "available", desc: "Track website conversions", category: "Analytics" },
];

const categories = ["All", "Messaging", "AI", "CRM", "Email", "Database", "Automation", "Analytics"];

export default function IntegrationsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState("");
  const { showToast } = useToast();

  const handleSimulate = async (channelName: string) => {
    try {
      showToast(`Simulating ${channelName} lead...`);
      const channel = channelName === "Instagram" ? "instagram" : "facebook";
      const sender = "sim_user_" + Math.floor(Math.random() * 1000);
      
      const res = await fetch("http://127.0.0.1:4000/api/integrations/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          sender,
          message: "Hi, do you provide salon marketing?"
        })
      });
      
      if (res.ok) {
        showToast(`Simulated ${channel} lead successfully!`);
      } else {
        showToast(`Error simulating lead.`);
      }
    } catch (err) {
      console.error(err);
      showToast("Error simulating lead.");
    }
  };

  const handleConnect = () => {
    setModalOpen(false);
    showToast(selectedIntegration ? `${selectedIntegration} connected successfully` : "Integration added successfully");
    setSelectedIntegration("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div className="dashboard-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plug size={22} color="#a78bfa" />
          </div>
          <div>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em" }}>Integrations</h1>
            <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)", marginTop: 2 }}>
              {integrations.filter(i => i.status === "connected").length} connected · {integrations.filter(i => i.status === "available").length} available
            </p>
          </div>
        </div>
        <button className="btn-primary" style={{ fontSize: 13, padding: "9px 18px" }} onClick={() => setModalOpen(true)}>
          <Plus size={14} /> Add Integration
        </button>
      </div>

      {/* API Keys */}
      <div className="glass-card-elevated" style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <Key size={16} color="#a78bfa" />
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff" }}>API Keys</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "NexusAI Public Key",  key: "nxa_pub_sk_test_4a9f2b8c1d3e7g6h5i",     scope: "Read" },
            { name: "NexusAI Secret Key",  key: "nxa_sec_sk_••••••••••••••••••••••••••••", scope: "Full Access" },
            { name: "Webhook Secret",       key: "whsec_••••••••••••••••••••••••••••••",   scope: "Webhook" },
          ].map(k => (
            <div key={k.name} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "12px 16px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff", marginBottom: 4 }}>{k.name}</div>
                <code style={{ fontSize: 12, color: "rgba(240,240,255,0.45)", fontFamily: "monospace" }}>{k.key}</code>
              </div>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)", fontWeight: 600 }}>{k.scope}</span>
              <button style={{ padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,255,0.5)", cursor: "pointer" }} onClick={() => showToast(`${k.name} copied to clipboard`)}>Copy</button>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button key={cat} style={{
            padding: "6px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
            background: cat === "All" ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
            border: cat === "All" ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.07)",
            color: cat === "All" ? "#a78bfa" : "rgba(240,240,255,0.5)",
          }}>{cat}</button>
        ))}
      </div>

      {/* Integration Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {integrations.map(intg => (
          <div key={intg.name} style={{
            background: "linear-gradient(145deg, rgba(15,15,35,0.9), rgba(10,10,25,0.95))",
            border: `1px solid ${intg.status === "connected" ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)"}`,
            borderRadius: 14, padding: 20,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: intg.color + "18", border: `1px solid ${intg.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: intg.color,
              }}>
                {intg.icon}
              </div>
              {intg.status === "connected"
                ? <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 700, color: "#34d399", background: "rgba(16,185,129,0.1)", padding: "3px 10px", borderRadius: 99, border: "1px solid rgba(16,185,129,0.2)" }}>
                    <CheckCircle size={11} /> Connected
                  </span>
                : <button
                    style={{ fontSize: 11.5, fontWeight: 600, color: "#a78bfa", background: "rgba(139,92,246,0.1)", padding: "3px 10px", borderRadius: 99, border: "1px solid rgba(139,92,246,0.2)", cursor: "pointer" }}
                    onClick={() => { setSelectedIntegration(intg.name); setModalOpen(true); }}
                  >
                    + Connect
                  </button>
              }
            </div>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>{intg.name}</div>
            <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.45)", marginBottom: 14, lineHeight: 1.5 }}>{intg.desc}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 99, background: "rgba(255,255,255,0.05)", color: "rgba(240,240,255,0.35)" }}>{intg.category}</span>
              <div style={{ display: "flex", gap: 10 }}>
                {intg.status === "connected" && (intg.name === "Instagram" || intg.name === "Facebook Messenger") && (
                  <button 
                    onClick={() => handleSimulate(intg.name)}
                    style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#f0f0ff", background: "rgba(139,92,246,0.3)", padding: "4px 8px", borderRadius: 6, border: "1px solid rgba(139,92,246,0.5)", cursor: "pointer", fontWeight: 600 }}
                  >
                    Simulate Lead
                  </button>
                )}
                {intg.status === "connected" && (
                  <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "rgba(240,240,255,0.4)", background: "none", border: "none", cursor: "pointer" }}>
                    <ExternalLink size={12} /> Configure
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()} style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f0f0ff" }}>
                {selectedIntegration ? `Connect ${selectedIntegration}` : "Add Integration"}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,240,255,0.4)" }}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)", marginBottom: 20, lineHeight: 1.5 }}>
              Enter your API credentials to connect this integration. Keys are encrypted at rest.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(240,240,255,0.55)", display: "block", marginBottom: 6 }}>API Key</label>
                <input className="input-glass" placeholder="sk_live_..." />
              </div>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(240,240,255,0.55)", display: "block", marginBottom: 6 }}>Workspace ID</label>
                <input className="input-glass" placeholder="ws_..." />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn-secondary" style={{ fontSize: 13 }} onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn-primary" style={{ fontSize: 13 }} onClick={handleConnect}>Connect</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
