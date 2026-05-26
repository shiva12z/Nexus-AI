"use client";
import { useEffect, useState } from "react";
import { activityFeed, leadConversionData, channelData } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, MessageCircle, UserPlus, Bot, Calendar, DollarSign, Clock, ArrowRight, Zap, Loader2 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import Link from "next/link";
import { getStoredUser, API_BASE, getToken } from "@/lib/auth";

// Fallback mock data in case API fails or returns empty data for charts
const fallbackChartData = [
  { day: "Mon", whatsapp: 0, instagram: 0, facebook: 0, webchat: 0 },
];

const activityIconMap: Record<string, string> = {
  lead: "🎯", booking: "📅", ai: "🤖", whatsapp: "💬", human: "⚠️",
};

const channelColors: Record<string, string> = {
  WhatsApp: "#25D366", Instagram: "#E1306C", Facebook: "#1877F2", "Web Chat": "#8b5cf6",
};

export default function DashboardPage() {
  const [salutation, setSalutation] = useState("Hello");
  const [userName, setUserName] = useState("there");
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>(fallbackChartData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setSalutation("Good morning");
    else if (hour < 18) setSalutation("Good afternoon");
    else setSalutation("Good evening");

    // Fetch user from local storage (custom auth)
    const user = getStoredUser();
    if (user) {
      setUserName(user.full_name || user.email.split('@')[0]);
    }
    
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, volRes] = await Promise.all([
        fetch(`${API_BASE}/analytics/dashboard`, { headers: { "Authorization": `Bearer ${getToken()}` } }),
        fetch(`${API_BASE}/analytics/message-volume`, { headers: { "Authorization": `Bearer ${getToken()}` } })
      ]);
      const statsData = await statsRes.json();
      const volData = await volRes.json();

      if (statsData.success) setStats(statsData.data);
      if (volData.success && volData.data.length > 0) setChartData(volData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = stats ? [
    { label: "Total Conversations", value: stats.totalConversations.toLocaleString(), change: "+0%", up: true, icon: <MessageCircle size={18} />, color: "#8b5cf6" },
    { label: "Leads Captured", value: stats.totalLeads.toLocaleString(), change: "+0%", up: true, icon: <UserPlus size={18} />, color: "#10b981" },
    { label: "Total Messages", value: stats.totalMessages.toLocaleString(), change: "+0%", up: true, icon: <Bot size={18} />, color: "#3b82f6" },
    { label: "AI Response Rate", value: stats.aiResponseRate, change: "0%", up: true, icon: <Zap size={18} />, color: "#f59e0b" },
  ] : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Header */}
      <div className="dashboard-page-header">
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 26, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em", marginBottom: 4 }}>
            {salutation}, {userName || "User"} 👋
          </h1>
          <p style={{ fontSize: 14, color: "rgba(240,240,255,0.45)" }}>
            Your AI handled 94 conversations overnight. Here's your overview.
          </p>
        </div>
        <Link href="/dashboard/inbox" className="btn-primary" style={{ fontSize: 13, padding: "9px 18px" }}>
          Open Inbox <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {isLoading ? (
          <div style={{ padding: 40, textAlign: "center", color: "rgba(240,240,255,0.4)", gridColumn: "1 / -1" }}>
            <Loader2 size={24} className="animate-spin" style={{ margin: "0 auto", marginBottom: 10 }} />
            Loading dashboard data...
          </div>
        ) : statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="glass-card"
            style={{ display: "flex", flexDirection: "column", gap: 12, padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: stat.color + "18",
                border: `1px solid ${stat.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: stat.color,
              }}>
                {stat.icon}
              </div>
              <span style={{
                fontSize: 12, fontWeight: 700,
                color: stat.up ? "#34d399" : "#f87171",
                display: "flex", alignItems: "center", gap: 3,
              }}>
                {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.change}
              </span>
            </div>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.03em", marginBottom: 4 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.4)" }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="dashboard-grid-2">
        {/* Message Trends */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 2 }}>Message Volume</h3>
              <p style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>Last 7 days by channel</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {[
                  { id: "wa", color: "#25D366" }, { id: "ig", color: "#E1306C" },
                  { id: "fb", color: "#1877F2" }, { id: "wc", color: "#8b5cf6" },
                ].map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }}
                labelStyle={{ color: "#f0f0ff" }}
              />
              <Area type="monotone" dataKey="whatsapp" stroke="#25D366" fill="url(#wa)" strokeWidth={2} />
              <Area type="monotone" dataKey="instagram" stroke="#E1306C" fill="url(#ig)" strokeWidth={2} />
              <Area type="monotone" dataKey="facebook" stroke="#1877F2" fill="url(#fb)" strokeWidth={2} />
              <Area type="monotone" dataKey="webchat" stroke="#8b5cf6" fill="url(#wc)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Breakdown */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>Channel Breakdown</h3>
          <p style={{ fontSize: 12, color: "rgba(240,240,255,0.4)", marginBottom: 20 }}>Conversations by source</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={channelData}
                cx="50%" cy="50%" innerRadius={48} outerRadius={72}
                paddingAngle={3} dataKey="value"
              >
                {channelData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            {channelData.map(ch => (
              <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: ch.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "rgba(240,240,255,0.6)", flex: 1 }}>{ch.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#f0f0ff" }}>{ch.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Conversion + Activity */}
      <div className="dashboard-grid-2">
        {/* Lead Conversion */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>Lead Conversion</h3>
          <p style={{ fontSize: 12, color: "rgba(240,240,255,0.4)", marginBottom: 20 }}>Leads vs. Converted last 5 months</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={leadConversionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "rgba(240,240,255,0.35)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.7} />
              <Bar dataKey="converted" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff" }}>Live Activity</h3>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse-glow 2s ease-in-out infinite" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {activityFeed.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: "rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, flexShrink: 0,
                }}>
                  {activityIconMap[item.type] || "📩"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.7)", lineHeight: 1.4 }}>{item.text}</div>
                  <div style={{ fontSize: 11, color: "rgba(240,240,255,0.25)", marginTop: 2 }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
