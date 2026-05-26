"use client";
import { Fragment } from "react";
import { msgVolumeData, leadConversionData, channelData, responseTimeData } from "@/lib/mock-data";
import { BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Download } from "lucide-react";

const kpis = [
  { label: "Conversation Volume",  value: "9,841", change: "+22%", up: true, color: "#8b5cf6" },
  { label: "AI Accuracy",          value: "97.3%", change: "+1.2%", up: true, color: "#10b981" },
  { label: "Avg Response Time",    value: "1.4 min", change: "-18%", up: true, color: "#3b82f6" },
  { label: "Lead Conversion Rate", value: "40.3%", change: "+8.2%", up: true, color: "#f59e0b" },
  { label: "Booking Rate",         value: "23.1%", change: "+11%", up: true, color: "#ec4899" },
  { label: "CSAT Score",           value: "4.8/5",  change: "+0.3", up: true, color: "#22d3ee" },
];

const heatmapData = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => ({
    day, hour, value: Math.floor(Math.random() * 100),
  }))
).flat();

export default function AnalyticsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div className="dashboard-page-header">
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em", marginBottom: 4 }}>
            Analytics
          </h1>
          <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)" }}>Last 30 days · All channels</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["7d","30d","90d"].map(r => (
            <button key={r} style={{
              padding: "6px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              background: r === "30d" ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
              border: r === "30d" ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.08)",
              color: r === "30d" ? "#a78bfa" : "rgba(240,240,255,0.5)",
            }}>{r}</button>
          ))}
          <button className="btn-secondary" style={{ fontSize: 12, padding: "7px 14px" }}><Download size={13} /> Export</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="dashboard-grid-analytics-kpi">
        {kpis.map(kpi => (
          <div key={kpi.label} className="stat-card" style={{ padding: "16px 18px" }}>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 800, color: kpi.color, letterSpacing: "-0.03em", marginBottom: 5 }}>{kpi.value}</div>
            <div style={{ fontSize: 11.5, color: "rgba(240,240,255,0.4)", marginBottom: 8, lineHeight: 1.3 }}>{kpi.label}</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: kpi.up ? "#34d399" : "#f87171", display: "flex", alignItems: "center", gap: 3 }}>
              {kpi.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="dashboard-grid-analytics-charts">
        {/* Message Volume */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>Message Volume by Channel</h3>
          <p style={{ fontSize: 12, color: "rgba(240,240,255,0.35)", marginBottom: 20 }}>Last 7 days</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={msgVolumeData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="whatsapp" fill="#25D366" radius={[3,3,0,0]} stackId="a" />
              <Bar dataKey="instagram" fill="#E1306C" radius={[0,0,0,0]} stackId="a" />
              <Bar dataKey="facebook" fill="#1877F2" radius={[0,0,0,0]} stackId="a" />
              <Bar dataKey="webchat" fill="#8b5cf6" radius={[3,3,0,0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Pie */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>Leads by Channel</h3>
          <p style={{ fontSize: 12, color: "rgba(240,240,255,0.35)", marginBottom: 16 }}>Share of total leads</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} paddingAngle={3} dataKey="value">
                {channelData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          {channelData.map(ch => (
            <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: ch.color }} />
              <span style={{ fontSize: 12, color: "rgba(240,240,255,0.55)", flex: 1 }}>{ch.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#f0f0ff" }}>{ch.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="dashboard-grid-2-equal">
        {/* Response Time */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>Avg Response Time (min)</h3>
          <p style={{ fontSize: 12, color: "rgba(240,240,255,0.35)", marginBottom: 20 }}>By hour of day</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={responseTimeData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="time" stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: "#22d3ee", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Conversion */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>Lead → Booking Conversion</h3>
          <p style={{ fontSize: 12, color: "rgba(240,240,255,0.35)", marginBottom: 20 }}>5-month trend</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={leadConversionData} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="lead" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="converted" stroke="#8b5cf6" fill="url(#lead)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap */}
      <div className="glass-card-elevated" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>Conversation Heatmap</h3>
        <p style={{ fontSize: 12, color: "rgba(240,240,255,0.35)", marginBottom: 20 }}>Activity by day and hour of week</p>
        <div style={{ display: "grid", gridTemplateColumns: "40px repeat(24, 1fr)", gap: 3, alignItems: "center" }}>
          <div />
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 9, color: "rgba(240,240,255,0.25)" }}>
              {i % 4 === 0 ? `${i}h` : ""}
            </div>
          ))}
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day, di) => (
            <Fragment key={day}>
              <div key={day} style={{ fontSize: 10, color: "rgba(240,240,255,0.35)", textAlign: "right", paddingRight: 6 }}>{day}</div>
              {Array.from({ length: 24 }, (_, hi) => {
                const val = Math.floor(Math.random() * 100);
                return (
                  <div key={`${di}-${hi}`} style={{
                    height: 16, borderRadius: 3,
                    background: `rgba(139, 92, 246, ${val / 100 * 0.85 + 0.05})`,
                    transition: "background 0.2s",
                  }} title={`${day} ${hi}:00 — ${val} msgs`} />
                );
              })}
            </Fragment>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
          <span style={{ fontSize: 11, color: "rgba(240,240,255,0.3)" }}>Low</span>
          {[0.1, 0.3, 0.5, 0.7, 0.9].map(o => (
            <div key={o} style={{ width: 24, height: 10, borderRadius: 3, background: `rgba(139,92,246,${o})` }} />
          ))}
          <span style={{ fontSize: 11, color: "rgba(240,240,255,0.3)" }}>High</span>
        </div>
      </div>
    </div>
  );
}
