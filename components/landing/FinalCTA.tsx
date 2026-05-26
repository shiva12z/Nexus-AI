"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section style={{ padding: "100px 24px 120px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.12) 50%, rgba(139,92,246,0.08) 100%)",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: 28,
            padding: "72px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, height: 400,
            background: "radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginBottom: 24, padding: "6px 16px", borderRadius: 99,
              background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
            }}>
              <Zap size={12} color="#a78bfa" fill="#a78bfa" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Start for free today
              </span>
            </div>

            <h2 style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(30px, 5vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#f0f0ff",
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              Stop losing leads.
              <br />
              <span className="gradient-text glow-text-purple">
                Let AI handle conversations 24/7.
              </span>
            </h2>

            <p style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(240,240,255,0.55)",
              lineHeight: 1.7,
              maxWidth: 520, margin: "0 auto 40px",
            }}>
              Join thousands of SMBs who automated their customer communication with NexusAI. No setup fees. No contracts.
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/dashboard" className="btn-primary" style={{ fontSize: 16, padding: "15px 32px" }}>
                Start Free Trial — 14 Days <ArrowRight size={16} />
              </Link>
              <button className="btn-secondary" style={{ fontSize: 15, padding: "14px 28px" }}>
                Talk to Sales
              </button>
            </div>

            <p style={{ fontSize: 12.5, color: "rgba(240,240,255,0.28)", marginTop: 24 }}>
              No credit card required · Setup in 15 minutes · Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
