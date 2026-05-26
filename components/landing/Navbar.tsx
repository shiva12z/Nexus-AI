"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Zap, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(5,5,8,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(139,92,246,0.4)",
          }}>
            <Zap size={18} color="white" fill="white" />
          </div>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 20, color: "#f0f0ff", letterSpacing: "-0.02em" }}>
            Nexus<span style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} style={{
              padding: "7px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: "rgba(240,240,255,0.65)", textDecoration: "none", transition: "color 0.18s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#f0f0ff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,255,0.65)")}
            >{link.label}</a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/login" className="btn-secondary" style={{ padding: "8px 18px", fontSize: 13 }}>
            Sign In
          </Link>
          <Link href="/signup" className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>
            Start Free Trial
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,240,255,0.7)", display: "none", padding: 4 }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: "rgba(5,5,8,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4,
        }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} style={{
              padding: "10px 12px", borderRadius: 8, fontSize: 15, fontWeight: 500,
              color: "rgba(240,240,255,0.7)", textDecoration: "none",
            }}>{link.label}</a>
          ))}
          <Link href="/signup" className="btn-primary" style={{ marginTop: 8, justifyContent: "center" }}>
            Start Free Trial
          </Link>
          <Link href="/login" className="btn-secondary" style={{ marginTop: 8, justifyContent: "center" }}>
            Sign In
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
