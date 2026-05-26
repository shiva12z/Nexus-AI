"use client";
import Link from "next/link";
import { Zap, X, Code2, Briefcase } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Integrations: ["WhatsApp", "Instagram", "Facebook", "Salesforce"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "60px 24px 40px",
      background: "rgba(5,5,8,0.8)",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px repeat(4, 1fr)", gap: 40, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Zap size={16} color="white" fill="white" />
              </div>
              <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 18, color: "#f0f0ff" }}>
                NexusAI
              </span>
            </Link>
            <p style={{ fontSize: 13, color: "rgba(240,240,255,0.4)", lineHeight: 1.7, marginBottom: 20 }}>
              The AI employee for customer conversations. Available 24/7.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[X, Code2, Briefcase].map((Icon, i) => (
                <button key={i} style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(240,240,255,0.4)", cursor: "pointer",
                }}>
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "rgba(240,240,255,0.4)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 16 }}>
                {group}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(link => (
                  <a key={link} href="#" style={{ fontSize: 13.5, color: "rgba(240,240,255,0.5)", textDecoration: "none", transition: "color 0.18s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f0f0ff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,255,0.5)")}
                  >{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: 28,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: 13, color: "rgba(240,240,255,0.3)" }}>
            © 2026 NexusAI, Inc. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: "rgba(240,240,255,0.25)" }}>
            Built with ♥ for modern SMBs
          </p>
        </div>
      </div>
    </footer>
  );
}
