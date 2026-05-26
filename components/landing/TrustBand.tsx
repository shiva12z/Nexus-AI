"use client";
import { motion } from "framer-motion";

const companies = [
  "Acme Corp", "Stellar Co", "Nova Labs", "Apex Digital", "Vertex Inc",
  "Prism AI", "Surge Media", "Orbit Tech", "Quantum Co", "Nexus Group",
  "Pulse AI", "Echo Works", "Zenith SMB", "Vela Corp", "Flare Studio",
];

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 20px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.03)",
      color: "rgba(240,240,255,0.35)",
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: "nowrap",
      letterSpacing: "-0.01em",
    }}>
      <div style={{ width: 20, height: 20, borderRadius: 5, background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", opacity: 0.7 }} />
      {name}
    </div>
  );
}

export default function TrustBand() {
  const doubled = [...companies, ...companies];

  return (
    <section style={{ padding: "80px 0 60px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(240,240,255,0.3)" }}>
          Trusted by modern SMBs worldwide
        </p>
      </div>

      {/* Marquee */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: "linear-gradient(90deg, var(--bg-primary) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: "linear-gradient(270deg, var(--bg-primary) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: 16, width: "max-content" }}
        >
          {doubled.map((company, i) => (
            <LogoPlaceholder key={i} name={company} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
