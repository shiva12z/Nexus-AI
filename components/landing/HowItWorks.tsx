"use client";
import { motion } from "framer-motion";
import { Link2, Brain, Zap, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <Link2 size={28} />,
    color: "#3b82f6",
    title: "Connect Channels",
    desc: "Link WhatsApp, Instagram, Facebook, and your website in minutes. No coding required.",
    tags: ["WhatsApp API", "Instagram Graph", "Facebook Messenger", "Web Widget"],
  },
  {
    num: "02",
    icon: <Brain size={28} />,
    color: "#8b5cf6",
    title: "Train Your AI",
    desc: "Upload your knowledge base, FAQs, and product info. AI learns your business instantly.",
    tags: ["PDF Upload", "FAQ Builder", "Web Scraper", "Auto-Training"],
  },
  {
    num: "03",
    icon: <Zap size={28} />,
    color: "#10b981",
    title: "Automate Conversations",
    desc: "AI handles replies, captures leads, books appointments, and escalates when needed.",
    tags: ["24/7 AI Replies", "Lead Capture", "Auto Booking", "Smart Routing"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "100px 24px", background: "rgba(10,10,20,0.4)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge badge-blue" style={{ marginBottom: 18, display: "inline-flex" }}>
              How It Works
            </span>
            <h2 style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(30px, 5vw, 50px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f0f0ff",
              marginBottom: 16,
            }}>
              Up and running in{" "}
              <span className="gradient-text">3 steps</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(240,240,255,0.5)", maxWidth: 480, margin: "0 auto" }}>
              From zero to fully automated customer support in under 15 minutes.
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: 48,
                alignItems: "center",
                direction: i % 2 === 0 ? "ltr" : "rtl",
              }}
            >
              {/* Content */}
              <div style={{ direction: "ltr" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: step.color + "18",
                    border: `1px solid ${step.color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: step.color,
                  }}>
                    {step.icon}
                  </div>
                  <span style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 48, fontWeight: 800, color: "rgba(255,255,255,0.07)",
                    letterSpacing: "-0.04em", lineHeight: 1,
                  }}>{step.num}</span>
                </div>
                <h3 style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 28, fontWeight: 700, color: "#f0f0ff",
                  letterSpacing: "-0.02em", marginBottom: 14,
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 16, color: "rgba(240,240,255,0.55)", lineHeight: 1.7, marginBottom: 24 }}>
                  {step.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {step.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                      background: step.color + "15", color: step.color,
                      border: `1px solid ${step.color}30`,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div style={{ direction: "ltr" }}>
                <div style={{
                  background: "linear-gradient(145deg, rgba(15,15,35,0.9), rgba(10,10,25,0.95))",
                  border: `1px solid ${step.color}25`,
                  borderRadius: 20,
                  padding: 32,
                  boxShadow: `0 20px 60px ${step.color}15`,
                  minHeight: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: 20,
                      background: step.color + "20",
                      border: `1px solid ${step.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: step.color, margin: "0 auto 16px",
                      animation: "pulse-glow 2.5s ease-in-out infinite",
                    }}>
                      {step.icon}
                    </div>
                    <p style={{ fontSize: 14, color: "rgba(240,240,255,0.4)", lineHeight: 1.5 }}>
                      Step {step.num} — {step.title}
                    </p>
                    {/* Step-specific mini visual */}
                    {i === 0 && (
                      <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "center" }}>
                        {["WhatsApp","Instagram","Facebook","Web"].map((ch, ci) => (
                          <div key={ci} style={{
                            padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                            background: "rgba(59,130,246,0.12)",
                            border: "1px solid rgba(59,130,246,0.25)",
                            color: "#60a5fa",
                          }}>{ch}</div>
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      <div style={{ marginTop: 20 }}>
                        <div style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, padding: "8px 14px", fontSize: 12, color: "#a78bfa" }}>
                          🧠 AI Training: 92% complete...
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                        {["AI replied in 0.8s ✓", "Lead captured ✓", "Meeting booked ✓"].map((s, si) => (
                          <div key={si} style={{ fontSize: 12, color: "#34d399", display: "flex", alignItems: "center", gap: 6 }}>
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
