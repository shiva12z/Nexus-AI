"use client";
import { motion } from "framer-motion";
import {
  MessageCircle, Camera, Share2, Inbox, Phone, UserPlus,
  Calendar, Brain, GitBranch, BarChart3, Mail, Database,
} from "lucide-react";

const features = [
  {
    icon: <MessageCircle size={22} />, color: "#25D366", bg: "rgba(37,211,102,0.12)",
    title: "WhatsApp AI Automation",
    desc: "Auto-reply, lead capture, appointment booking — all via WhatsApp Business API.",
  },
  {
    icon: <Camera size={22} />, color: "#E1306C", bg: "rgba(225,48,108,0.12)",
    title: "Instagram Auto Replies",
    desc: "Turn DMs, story replies, and comments into automated sales conversations.",
  },
  {
    icon: <Share2 size={22} />, color: "#1877F2", bg: "rgba(24,119,242,0.12)",
    title: "Facebook Inbox AI",
    desc: "Messenger automation with AI lead detection and smart routing.",
  },
  {
    icon: <Inbox size={22} />, color: "#8b5cf6", bg: "rgba(139,92,246,0.12)",
    title: "Unified Inbox",
    desc: "All channels in one place. Assign to agents, add notes, track status.",
  },
  {
    icon: <Phone size={22} />, color: "#22d3ee", bg: "rgba(34,211,238,0.12)",
    title: "AI Voice Agent",
    desc: "AI handles inbound calls, qualifies leads, and books meetings automatically.",
  },
  {
    icon: <UserPlus size={22} />, color: "#f59e0b", bg: "rgba(245,158,11,0.12)",
    title: "Lead Capture",
    desc: "Capture, score, and qualify leads from every channel with AI intelligence.",
  },
  {
    icon: <Calendar size={22} />, color: "#10b981", bg: "rgba(16,185,129,0.12)",
    title: "Appointment Booking",
    desc: "AI schedules meetings, sends confirmations, and manages your calendar.",
  },
  {
    icon: <Brain size={22} />, color: "#a78bfa", bg: "rgba(167,139,250,0.12)",
    title: "AI Knowledge Base",
    desc: "Train AI on your PDFs, FAQs, and website. Smart answers in seconds.",
  },
  {
    icon: <GitBranch size={22} />, color: "#ec4899", bg: "rgba(236,72,153,0.12)",
    title: "Workflow Automation",
    desc: "Visual drag-and-drop automations. Trigger, respond, notify, book — automatically.",
  },
  {
    icon: <BarChart3 size={22} />, color: "#3b82f6", bg: "rgba(59,130,246,0.12)",
    title: "Analytics Dashboard",
    desc: "Real-time metrics: response time, AI accuracy, lead conversion, revenue.",
  },
  {
    icon: <Mail size={22} />, color: "#f97316", bg: "rgba(249,115,22,0.12)",
    title: "Email Notifications",
    desc: "Instant alerts for new leads, bookings, and escalations via email.",
  },
  {
    icon: <Database size={22} />, color: "#6366f1", bg: "rgba(99,102,241,0.12)",
    title: "CRM Sync",
    desc: "Export leads to Google Sheets, HubSpot, Salesforce, or any CRM.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function FeaturesGrid() {
  return (
    <section id="features" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge-purple" style={{ marginBottom: 18, display: "inline-flex" }}>
              Everything You Need
            </span>
            <h2 style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f0f0ff",
              marginBottom: 16,
            }}>
              The complete AI communication{" "}
              <span className="gradient-text">stack</span>
            </h2>
            <p style={{ fontSize: 18, color: "rgba(240,240,255,0.55)", maxWidth: 540, margin: "0 auto" }}>
              Every tool you need to automate customer conversations and convert leads — out of the box.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background: "linear-gradient(145deg, rgba(15,15,35,0.9) 0%, rgba(10,10,25,0.95) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: 28,
                cursor: "default",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onHoverStart={e => {
                const el = e.target as HTMLElement;
                el.style.borderColor = feature.color + "35";
                el.style.boxShadow = `0 8px 40px ${feature.color}15`;
              }}
              onHoverEnd={e => {
                const el = e.target as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: feature.bg,
                border: `1px solid ${feature.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: feature.color,
                marginBottom: 18,
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f0f0ff", marginBottom: 8, letterSpacing: "-0.01em" }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: 14, color: "rgba(240,240,255,0.5)", lineHeight: 1.65 }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
