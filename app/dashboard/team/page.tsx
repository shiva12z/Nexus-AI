"use client";
import { mockTeamMembers } from "@/lib/mock-data";
import { Users, UserPlus, MoreHorizontal, MessageCircle, CheckCircle, Clock } from "lucide-react";

const statusColors: Record<string, string> = { online: "#10b981", away: "#f59e0b", offline: "rgba(240,240,255,0.25)" };

export default function TeamPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em", marginBottom: 4 }}>Team Management</h1>
          <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)" }}>{mockTeamMembers.length} members · 2 online</p>
        </div>
        <button className="btn-primary" style={{ fontSize: 13, padding: "9px 18px" }}>
          <UserPlus size={14} /> Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="dashboard-grid-team-stats">
        {[
          { label: "Total Members", value: "4", color: "#8b5cf6" },
          { label: "Active Conversations", value: "25", color: "#3b82f6" },
          { label: "Resolved Today", value: "194", color: "#10b981" },
          { label: "Avg Response Time", value: "2.1m", color: "#f59e0b" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 32, fontWeight: 800, color: s.color, letterSpacing: "-0.03em", marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.45)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Team Table */}
      <div className="glass-card-elevated table-scroll-wrapper" style={{ overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff" }}>Team Members</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Status</th>
              <th>Active Conversations</th>
              <th>Resolved</th>
              <th>Avg Response</th>
              <th>Channels</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockTeamMembers.map(member => (
              <tr key={member.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "rgba(139,92,246,0.15)", border: "1.5px solid rgba(139,92,246,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, color: "#a78bfa",
                    }}>
                      {member.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff" }}>{member.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>{member.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: 12.5, fontWeight: 600, padding: "3px 10px", borderRadius: 99, background: "rgba(139,92,246,0.1)", color: "#a78bfa" }}>
                    {member.role}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColors[member.status] }} />
                    <span style={{ fontSize: 13, color: "rgba(240,240,255,0.55)", textTransform: "capitalize" }}>{member.status}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <MessageCircle size={13} color="rgba(240,240,255,0.35)" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#f0f0ff" }}>{member.conversations}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle size={13} color="#34d399" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#f0f0ff" }}>{member.resolved}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Clock size={12} color="rgba(240,240,255,0.35)" />
                    <span style={{ fontSize: 13, color: "rgba(240,240,255,0.6)" }}>{member.responseTime}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    {member.channels.map(ch => (
                      <span key={ch} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 99, background: "rgba(255,255,255,0.06)", color: "rgba(240,240,255,0.4)" }}>{ch}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,240,255,0.3)", padding: 4 }}>
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Chart */}
      <div className="glass-card-elevated" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 20 }}>Performance Metrics</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {mockTeamMembers.map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#a78bfa", flexShrink: 0 }}>
                {m.avatar}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff", width: 140, flexShrink: 0 }}>{m.name}</div>
              <div style={{ flex: 1 }}>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${Math.min((m.resolved / 120) * 100, 100)}%` }} />
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", width: 60, textAlign: "right" }}>
                {m.resolved} resolved
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
