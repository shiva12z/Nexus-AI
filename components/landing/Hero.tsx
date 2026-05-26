"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowRight, MessageCircle, Zap, Bot } from "lucide-react";

const floatingBubbles = [
  { text: "📱 WhatsApp AI replied!", x: "8%", y: "28%", delay: 0, color: "#25D366" },
  { text: "🤖 Lead captured!", x: "72%", y: "20%", delay: 0.6, color: "#8b5cf6" },
  { text: "📅 Meeting booked!", x: "78%", y: "60%", delay: 1.2, color: "#3b82f6" },
  { text: "✨ AI responded in 0.8s", x: "4%", y: "65%", delay: 0.9, color: "#22d3ee" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Background effects */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% -10%, rgba(139,92,246,0.35) 0%, rgba(59,130,246,0.15) 40%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      {/* Floating bubbles */}
      {floatingBubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ delay: b.delay, duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: b.x, top: b.y,
            background: "rgba(15,15,30,0.9)",
            border: `1px solid ${b.color}40`,
            borderRadius: 12,
            padding: "9px 14px",
            fontSize: 12.5,
            fontWeight: 600,
            color: "#f0f0ff",
            whiteSpace: "nowrap",
            backdropFilter: "blur(12px)",
            boxShadow: `0 4px 24px ${b.color}25`,
            zIndex: 10,
          }}
        >
          {b.text}
        </motion.div>
      ))}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 2 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32 }}
        >
          <span className="badge badge-purple" style={{ fontSize: 12 }}>
            <Zap size={10} /> AI-Powered · Launch 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(40px, 7vw, 76px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#f0f0ff",
            marginBottom: 24,
          }}
        >
          Your AI Employee for{" "}
          <br />
          <span className="gradient-text glow-text-purple">
            Customer Conversations
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "rgba(240,240,255,0.6)",
            lineHeight: 1.65,
            maxWidth: 640,
            margin: "0 auto 40px",
          }}
        >
          Automate WhatsApp, Instagram, Facebook, voice calls, bookings, and customer support from one{" "}
          <span style={{ color: "#a78bfa", fontWeight: 500 }}>intelligent inbox</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}
        >
          <Link href="/dashboard" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
            Start Free Trial <ArrowRight size={16} />
          </Link>
          <button className="btn-secondary" style={{ fontSize: 15, padding: "13px 28px" }}>
            <Play size={15} fill="currentColor" /> Watch Demo
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap" }}
        >
          {[
            { icon: <MessageCircle size={14} />, text: "10M+ messages automated" },
            { icon: <Bot size={14} />, text: "94% AI response rate" },
            { icon: <Zap size={14} />, text: "< 1s response time" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(240,240,255,0.45)", fontSize: 13 }}>
              <span style={{ color: "#8b5cf6" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 64, position: "relative" }}
        >
          {/* Glow beneath */}
          <div style={{
            position: "absolute",
            bottom: -40, left: "10%", right: "10%", height: 100,
            background: "radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)",
            filter: "blur(20px)",
          }} />
          <div style={{
            background: "rgba(10,10,20,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
          }}>
            {/* Browser bar */}
            <div style={{
              background: "rgba(15,15,30,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{ display: "flex", gap: 7 }}>
                {["#ef4444","#f59e0b","#10b981"].map((c,i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.8 }} />
                ))}
              </div>
              <div style={{
                flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8,
                padding: "5px 14px", fontSize: 12, color: "rgba(240,240,255,0.35)",
                maxWidth: 300, margin: "0 auto",
              }}>
                app.nexusai.io/dashboard
              </div>
            </div>

            {/* Mini Dashboard */}
            <div style={{ padding: 24, display: "grid", gridTemplateColumns: "200px 1fr", gap: 20, minHeight: 340 }}>
              {/* Mini sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {["Dashboard","Unified Inbox","WhatsApp","Instagram","Leads","Analytics"].map((item, i) => (
                  <div key={i} style={{
                    padding: "7px 10px", borderRadius: 7, fontSize: 12, fontWeight: 500,
                    color: i === 0 ? "#a78bfa" : "rgba(240,240,255,0.4)",
                    background: i === 0 ? "rgba(139,92,246,0.12)" : "transparent",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "#8b5cf6" : "rgba(255,255,255,0.15)" }} />
                    {item}
                  </div>
                ))}
              </div>
              {/* Mini content */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, alignContent: "start" }}>
                {[
                  { label: "Conversations", value: "1,284", color: "#8b5cf6" },
                  { label: "Leads", value: "348", color: "#3b82f6" },
                  { label: "AI Rate", value: "94.2%", color: "#10b981" },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 10, padding: "14px 16px",
                  }}>
                    <div style={{ fontSize: 10, color: "rgba(240,240,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{stat.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: stat.color, fontFamily: "Space Grotesk, sans-serif" }}>{stat.value}</div>
                  </div>
                ))}
                {/* Mini chart bars */}
                <div style={{ gridColumn: "1 / -1", background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
                  {[30,45,35,60,55,72,65,80,74,90,84,95].map((h,i) => (
                    <div key={i} style={{
                      flex: 1, height: `${h}%`, borderRadius: 4,
                      background: `linear-gradient(to top, #8b5cf6, #3b82f6)`,
                      opacity: 0.7 + (i / 12) * 0.3,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
