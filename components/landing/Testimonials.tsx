"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alex Mercer",
    role: "Founder, GrowthBolt",
    avatar: "AM",
    avatarColor: "#8b5cf6",
    quote: "NexusAI replaced our entire customer support team for routine queries. 94% of messages are now handled by AI, 24/7. Our response time went from 4 hours to 45 seconds.",
    metric: "4h → 45s response time",
    channel: "WhatsApp + Instagram",
  },
  {
    name: "Priya Nair",
    role: "CEO, Bloom Studios",
    avatar: "PN",
    avatarColor: "#E1306C",
    quote: "We were losing leads overnight when no one was online. NexusAI captures every Instagram DM, qualifies the lead, and even books discovery calls. We 3x'd our bookings in 6 weeks.",
    metric: "3× bookings in 6 weeks",
    channel: "Instagram DM",
  },
  {
    name: "Jordan Li",
    role: "Co-Founder, PulseShop",
    avatar: "JL",
    avatarColor: "#10b981",
    quote: "The unified inbox is a game-changer. Our team handles WhatsApp, Facebook, and Instagram from one screen. The AI suggestions save us hours every day.",
    metric: "6 hrs/day saved per agent",
    channel: "Unified Inbox",
  },
  {
    name: "Simone Okafor",
    role: "Growth Lead, TechEdge",
    avatar: "SO",
    avatarColor: "#f59e0b",
    quote: "I was skeptical about AI handling our complex B2B queries but NexusAI's knowledge base training is insane. It answers product questions better than our junior reps.",
    metric: "89% customer satisfaction",
    channel: "AI Knowledge Base",
  },
  {
    name: "Marcus Rey",
    role: "Director, QuickClinics",
    avatar: "MR",
    avatarColor: "#3b82f6",
    quote: "The appointment booking automation is pure magic. Patients WhatsApp us, AI checks availability, and books them instantly. Zero admin overhead.",
    metric: "200+ bookings automated/mo",
    channel: "WhatsApp Booking",
  },
  {
    name: "Yuki Tanaka",
    role: "Founder, NovaRetail",
    avatar: "YT",
    avatarColor: "#ec4899",
    quote: "The ROI is undeniable. We generate 348 qualified leads a month from channels that used to be completely unmonitored. NexusAI is our best-performing employee.",
    metric: "$48K revenue attributed",
    channel: "Multi-channel AI",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "100px 24px", background: "rgba(10,10,20,0.4)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge badge-pink" style={{ marginBottom: 18, display: "inline-flex" }}>
              Customer Stories
            </span>
            <h2 style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(30px, 5vw, 50px)",
              fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0ff", marginBottom: 14,
            }}>
              Founders love{" "}
              <span className="gradient-text">NexusAI</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(240,240,255,0.5)" }}>
              Real results from real businesses.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                background: "linear-gradient(145deg, rgba(15,15,35,0.9), rgba(10,10,25,0.95))",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                {Array(5).fill(0).map((_, si) => (
                  <span key={si} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{ fontSize: 14.5, color: "rgba(240,240,255,0.75)", lineHeight: 1.7, marginBottom: 24 }}>
                "{t.quote}"
              </p>

              {/* Metric */}
              <div style={{
                padding: "8px 14px", borderRadius: 8, marginBottom: 20,
                background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)",
                fontSize: 12, fontWeight: 700, color: "#a78bfa",
              }}>
                📈 {t.metric}
              </div>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: t.avatarColor + "25",
                  border: `2px solid ${t.avatarColor}50`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: t.avatarColor,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0ff" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>{t.role}</div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 99, fontSize: 10.5, fontWeight: 600,
                    background: "rgba(255,255,255,0.05)", color: "rgba(240,240,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>{t.channel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
