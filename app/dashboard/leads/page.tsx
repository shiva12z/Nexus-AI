"use client";
import { useState, useEffect } from "react";
import { Search, Filter, Download, UserPlus, TrendingUp, MoreHorizontal, ChevronDown, Loader2 } from "lucide-react";
import { API_BASE, getToken } from "@/lib/auth";

const statusColors: Record<string, string> = {
  new: "#3b82f6", contacted: "#f59e0b", qualified: "#10b981",
  escalated: "#ef4444", converted: "#8b5cf6",
};

const channelColors: Record<string, string> = {
  WhatsApp: "#25D366", Instagram: "#E1306C", Facebook: "#1877F2", "Web Chat": "#8b5cf6",
};

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        headers: { "Authorization": `Bearer ${getToken()}` }
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = leads.filter(l => {
    const nameMatch = l.name?.toLowerCase().includes(search.toLowerCase()) || false;
    const emailMatch = l.email?.toLowerCase().includes(search.toLowerCase()) || false;
    const matchSearch = nameMatch || emailMatch;
    const matchStatus = statusFilter === "All" || l.status === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em", marginBottom: 4 }}>
            Lead Management
          </h1>
          <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)" }}>
            {filtered.length} leads · AI-scored and ready to convert
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}>
            <Download size={14} /> Export CSV
          </button>
          <button className="btn-primary" style={{ fontSize: 13, padding: "8px 16px" }}>
            <UserPlus size={14} /> Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9, padding: "8px 14px", flex: 1, minWidth: 220 }}>
          <Search size={14} color="rgba(240,240,255,0.3)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..." style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#f0f0ff", width: "100%" }} />
        </div>
        {["All", "New", "Contacted", "Qualified", "Escalated", "Converted"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{
            padding: "8px 16px", borderRadius: 9, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
            background: statusFilter === s ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
            border: statusFilter === s ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.08)",
            color: statusFilter === s ? "#a78bfa" : "rgba(240,240,255,0.5)",
          }}>{s}</button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card-elevated table-scroll-wrapper" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Channel</th>
              <th>Intent</th>
              <th>Email</th>
              <th>Phone</th>
              <th>AI Score</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: 40, color: "rgba(240,240,255,0.4)" }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: "0 auto", marginBottom: 10 }} />
                  Loading leads...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: 40, color: "rgba(240,240,255,0.4)" }}>
                  No leads found.
                </td>
              </tr>
            ) : filtered.map(lead => (
              <tr key={lead.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "rgba(139,92,246,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, color: "#a78bfa",
                    }}>
                      {(lead.name || "?").substring(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff" }}>{lead.name || "Unknown"}</div>
                      <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
                        {/* Fake tags for MVP visual parity */}
                        <span style={{ padding: "1px 7px", borderRadius: 99, fontSize: 9.5, fontWeight: 700, background: "rgba(139,92,246,0.1)", color: "#a78bfa" }}>AI Scored</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11.5, fontWeight: 600, background: (channelColors[lead.source_channel] || channelColors.WhatsApp) + "18", color: (channelColors[lead.source_channel] || channelColors.WhatsApp) }}>
                    {lead.source_channel}
                  </span>
                </td>
                <td style={{ color: "rgba(240,240,255,0.65)" }}>{lead.intent}</td>
                <td style={{ fontSize: 12.5 }}>{lead.email || "-"}</td>
                <td style={{ fontSize: 12.5 }}>{lead.phone || "-"}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden", minWidth: 60 }}>
                      <div style={{ width: `${lead.score}%`, height: "100%", background: lead.score > 80 ? "#10b981" : lead.score > 60 ? "#f59e0b" : "#ef4444", borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: lead.score > 80 ? "#34d399" : lead.score > 60 ? "#fbbf24" : "#f87171", minWidth: 30 }}>{lead.score}</span>
                  </div>
                </td>
                <td>
                  <span style={{
                    padding: "3px 10px", borderRadius: 99, fontSize: 11.5, fontWeight: 700,
                    background: (statusColors[lead.status] || statusColors.new) + "18",
                    color: statusColors[lead.status] || statusColors.new,
                    textTransform: "capitalize",
                  }}>{lead.status}</span>
                </td>
                <td style={{ fontSize: 13, color: "rgba(240,240,255,0.55)" }}>{lead.assigned?.full_name || "-"}</td>
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
    </div>
  );
}
