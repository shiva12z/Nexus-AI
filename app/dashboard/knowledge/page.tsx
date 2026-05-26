"use client";
import { mockKnowledgeItems } from "@/lib/mock-data";
import type { ReactElement } from "react";
import { Brain, Upload, Globe, FileText, HelpCircle, Plus, Trash2, RefreshCw, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const statusIcon: Record<string, ReactElement> = {
  trained: <CheckCircle size={14} color="#10b981" />,
  training: <RefreshCw size={14} color="#f59e0b" />,
  pending: <Clock size={14} color="rgba(240,240,255,0.35)" />,
};

const typeIcon: Record<string, ReactElement> = {
  faq: <HelpCircle size={16} color="#8b5cf6" />,
  pdf: <FileText size={16} color="#3b82f6" />,
  web: <Globe size={16} color="#10b981" />,
};

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState("sources");
  const [trainingProgress] = useState(78);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Brain size={22} color="#a78bfa" />
          </div>
          <div>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em" }}>Knowledge Base</h1>
            <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)", marginTop: 2 }}>Train your AI on your business content</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}>
            <Globe size={14} /> Scrape Website
          </button>
          <button className="btn-primary" style={{ fontSize: 13, padding: "8px 16px" }}>
            <Upload size={14} /> Upload PDF
          </button>
        </div>
      </div>

      {/* Training Progress */}
      <div className="glass-card-elevated" style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 3 }}>AI Training Status</h3>
            <p style={{ fontSize: 13, color: "rgba(240,240,255,0.45)" }}>6 sources · 170 knowledge chunks indexed</p>
          </div>
          <span className="badge badge-orange">Training 1 source</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
          {[
            { label: "Sources", value: "6" }, { label: "Chunks", value: "170" },
            { label: "AI Accuracy", value: "97.3%" }, { label: "Queries Handled", value: "1,284" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 26, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12.5, color: "rgba(240,240,255,0.5)" }}>Overall training progress</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#a78bfa" }}>{trainingProgress}%</span>
          </div>
          <div className="progress-bar-track">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${trainingProgress}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4 }}>
        {["sources", "faqs", "preview"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "8px 18px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize",
            background: activeTab === tab ? "rgba(139,92,246,0.15)" : "transparent",
            border: activeTab === tab ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.08)",
            color: activeTab === tab ? "#a78bfa" : "rgba(240,240,255,0.5)",
          }}>{tab === "faqs" ? "FAQs" : tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        ))}
      </div>

      {/* Sources */}
      {activeTab === "sources" && (
        <div className="glass-card-elevated" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff" }}>Knowledge Sources</h3>
            <button className="btn-primary" style={{ fontSize: 12, padding: "6px 14px" }}>
              <Plus size={12} /> Add Source
            </button>
          </div>
          {mockKnowledgeItems.map(item => (
            <div key={item.id} style={{ padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {typeIcon[item.type]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0ff", marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>{item.chunks} chunks · Updated {item.updatedAt}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: item.status === "trained" ? "#34d399" : item.status === "training" ? "#fbbf24" : "rgba(240,240,255,0.35)", textTransform: "capitalize" }}>
                {statusIcon[item.status]} {item.status}
              </div>
              <button style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(240,240,255,0.3)" }}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "faqs" && (
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff" }}>FAQ Pairs</h3>
            <button className="btn-primary" style={{ fontSize: 12, padding: "7px 14px" }}><Plus size={12} /> Add FAQ</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { q: "What are your business hours?", a: "We're open Mon–Fri 9AM–6PM, Sat 10AM–4PM." },
              { q: "Do you offer free shipping?", a: "Yes, free shipping on all orders above $50." },
              { q: "What is your return policy?", a: "30-day hassle-free returns on all products." },
            ].map((faq, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff", marginBottom: 6 }}>Q: {faq.q}</div>
                <div style={{ fontSize: 13, color: "rgba(240,240,255,0.55)" }}>A: {faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "preview" && (
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 16 }}>Knowledge Chunks Preview</h3>
          {[
            { chunk: "Business Hours", content: "We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays.", score: 0.97 },
            { chunk: "Shipping Policy", content: "We offer free standard shipping on all orders over $50. Express shipping is available for $9.99. International shipping takes 7-14 business days.", score: 0.94 },
            { chunk: "Return Policy", content: "We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Refunds are processed within 5-7 business days.", score: 0.91 },
          ].map((c, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa" }}>#{i + 1} — {c.chunk}</span>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "rgba(16,185,129,0.12)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}>Relevance: {c.score}</span>
              </div>
              <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.6)", lineHeight: 1.65 }}>{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
