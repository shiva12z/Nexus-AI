"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import type { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div
      className="hero-grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 400,
          background: "var(--gradient-hero)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            textDecoration: "none",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 24px rgba(139,92,246,0.45)",
            }}
          >
            <Zap size={20} color="white" fill="white" />
          </div>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "#f0f0ff",
            }}
          >
            Nexus<span className="gradient-text">AI</span>
          </span>
        </Link>

        <div className="glass-card-elevated" style={{ padding: "32px 28px" }}>
          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#f0f0ff",
              letterSpacing: "-0.02em",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(240,240,255,0.45)",
              textAlign: "center",
              marginBottom: 28,
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
          {children}
        </div>

        {footer && (
          <div style={{ marginTop: 20, textAlign: "center", fontSize: 13.5 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
