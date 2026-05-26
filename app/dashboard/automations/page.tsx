"use client";
import { GitBranch, Plus, Zap, Bot, Mail, Calendar, UserPlus, Bell, ArrowRight, Play, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/dashboard/Toast";

const blockTypes = [
  { type: "trigger",  label: "Trigger",      icon: <Zap size={16} />,      color: "#f59e0b", desc: "WhatsApp message received" },
  { type: "ai",       label: "AI Response",  icon: <Bot size={16} />,      color: "#8b5cf6", desc: "Generate AI reply" },
  { type: "lead",     label: "Capture Lead", icon: <UserPlus size={16} />, color: "#3b82f6", desc: "Save contact info" },
  { type: "email",    label: "Send Email",   icon: <Mail size={16} />,     color: "#ec4899", desc: "Notify team via email" },
  { type: "notify",   label: "Notify Team",  icon: <Bell size={16} />,     color: "#22d3ee", desc: "Push notification" },
  { type: "book",     label: "Book Meeting", icon: <Calendar size={16} />, color: "#10b981", desc: "Schedule appointment" },
];

const savedFlows = [
  { name: "WhatsApp Lead Capture",    triggers: 284, status: "active", channel: "WhatsApp" },
  { name: "Instagram Comment → DM",   triggers: 156, status: "active", channel: "Instagram" },
  { name: "Appointment Booking Flow", triggers: 89,  status: "active", channel: "WhatsApp" },
  { name: "Support Escalation",       triggers: 42,  status: "paused", channel: "All" },
  { name: "After-Hours Response",     triggers: 201, status: "active", channel: "All" },
];

function WorkflowBlock({ block, index }: { block: typeof blockTypes[0]; index: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{
        background: block.color + "15",
        border: `1.5px solid ${block.color}35`,
        borderRadius: 14,
        padding: "14px 20px",
        width: 190,
        cursor: "grab",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: block.color + "20", border: `1px solid ${block.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: block.color }}>
            {block.icon}
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#f0f0ff" }}>{block.label}</span>
        </div>
        <p style={{ fontSize: 11.5, color: "rgba(240,240,255,0.45)", lineHeight: 1.4 }}>{block.desc}</p>
      </div>
      {index < blockTypes.length - 1 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ width: 1.5, height: 16, background: "rgba(139,92,246,0.3)" }} />
          <ArrowRight size={12} color="rgba(139,92,246,0.5)" style={{ transform: "rotate(90deg)" }} />
        </div>
      )}
    </div>
  );
}

export default function AutomationsPage() {
  const [activeFlow, setActiveFlow] = useState(savedFlows[0].name);
  const [modalOpen, setModalOpen] = useState(false);
  const [flowName, setFlowName] = useState("");
  const { showToast } = useToast();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(236,72,153,0.12)", border: "1px solid rgba(236,72,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GitBranch size={22} color="#ec4899" />
          </div>
          <div>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em" }}>Automation Builder</h1>
            <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)", marginTop: 2 }}>Visual workflow automation — no code required</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary" style={{ fontSize: 13 }}><Play size={13} /> Test Flow</button>
          <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setModalOpen(true)}><Plus size={14} /> New Flow</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 260px) 1fr", gap: 20 }} className="automations-layout">
        {/* Flow List */}
        <div className="glass-card-elevated" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 13.5, fontWeight: 700, color: "#f0f0ff", marginBottom: 14 }}>Saved Flows</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {savedFlows.map(flow => (
              <div
                key={flow.name}
                onClick={() => setActiveFlow(flow.name)}
                style={{
                  padding: "10px 12px", borderRadius: 9, cursor: "pointer",
                  background: activeFlow === flow.name ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.03)",
                  border: activeFlow === flow.name ? "1px solid rgba(139,92,246,0.25)" : "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f0f0ff", marginBottom: 4 }}>{flow.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10.5, color: "rgba(240,240,255,0.35)" }}>{flow.triggers} runs</span>
                  <span style={{
                    fontSize: 9.5, padding: "1px 7px", borderRadius: 99, fontWeight: 700,
                    background: flow.status === "active" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)",
                    color: flow.status === "active" ? "#34d399" : "rgba(240,240,255,0.35)",
                  }}>{flow.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="glass-card-elevated" style={{ padding: 28, minHeight: 500, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 3 }}>{activeFlow}</h3>
              <p style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>Drag blocks to build your automation</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span className="badge badge-green">Active</span>
              <button style={{ padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,255,0.5)", cursor: "pointer" }}>Edit</button>
            </div>
          </div>

          {/* Block canvas */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            {blockTypes.map((block, i) => (
              <WorkflowBlock key={block.type} block={block} index={i} />
            ))}
          </div>

          {/* Add block hint */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button style={{
              padding: "8px 20px", borderRadius: 99, fontSize: 13, fontWeight: 600,
              background: "rgba(139,92,246,0.1)", border: "1px dashed rgba(139,92,246,0.3)",
              color: "#a78bfa", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <Plus size={13} /> Add Block
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="dashboard-grid-team-stats">
        {[
          { label: "Total Flows", value: "5" },
          { label: "Runs This Month", value: "772" },
          { label: "Actions Automated", value: "4,284" },
          { label: "Hours Saved", value: "128" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ padding: "16px 20px" }}>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 30, fontWeight: 800, color: "#8b5cf6", letterSpacing: "-0.03em", marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()} style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f0f0ff" }}>Create New Flow</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,240,255,0.4)" }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(240,240,255,0.55)", display: "block", marginBottom: 6 }}>Flow Name</label>
              <input
                className="input-glass"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                placeholder="e.g. WhatsApp Lead Capture"
              />
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn-secondary" style={{ fontSize: 13 }} onClick={() => setModalOpen(false)}>Cancel</button>
              <button
                className="btn-primary"
                style={{ fontSize: 13 }}
                onClick={() => {
                  setModalOpen(false);
                  showToast(flowName ? `"${flowName}" flow created` : "New automation flow created");
                  setFlowName("");
                }}
              >
                Create Flow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
