"use client";
import { mockConversations } from "@/lib/mock-data";
import { Camera, Bot, Zap, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

const igConversations = mockConversations.filter(c => c.channel === "instagram");

export default function InstagramPage() {
  const [storyReply, setStoryReply] = useState(true);
  const [commentToDm, setCommentToDm] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(225,48,108,0.12)", border: "1px solid rgba(225,48,108,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Camera size={22} color="#E1306C" />
        </div>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em" }}>Instagram Automation</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#E1306C" }} />
            <span style={{ fontSize: 13, color: "#E1306C", fontWeight: 600 }}>Connected · @nexusai_business</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          { label: "DMs Today", value: "89", color: "#E1306C" },
          { label: "Story Replies", value: "34", color: "#f59e0b" },
          { label: "Comment → DMs", value: "22", color: "#8b5cf6" },
          { label: "Leads Captured", value: "18", color: "#10b981" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 6, letterSpacing: "-0.03em" }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.45)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Automation Toggles */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 18 }}>Automation Settings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "DM Auto-Reply", desc: "AI replies to all direct messages", value: true, stable: true },
              { label: "Story Reply Automation", desc: "Respond to story replies with AI", value: storyReply, toggle: () => setStoryReply(!storyReply) },
              { label: "Comment → DM", desc: "Send DM to users who comment specific keywords", value: commentToDm, toggle: () => setCommentToDm(!commentToDm) },
              { label: "AI Lead Detection", desc: "Auto-identify purchase intent from DMs", value: true, stable: true },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0ff", marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.4)" }}>{item.desc}</div>
                </div>
                <button onClick={item.toggle} style={{ background: "none", border: "none", cursor: item.toggle ? "pointer" : "default", flexShrink: 0 }}>
                  {item.value
                    ? <div style={{ width: 40, height: 22, borderRadius: 99, background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", position: "relative" }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: 21 }} /></div>
                    : <div style={{ width: 40, height: 22, borderRadius: 99, background: "rgba(255,255,255,0.1)", position: "relative" }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(255,255,255,0.5)", position: "absolute", top: 3, left: 3 }} /></div>
                  }
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent DMs */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 18 }}>Recent DMs</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {igConversations.concat(igConversations).slice(0, 4).map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#E1306C25", border: "1px solid #E1306C40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#E1306C", flexShrink: 0 }}>
                  {c.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff", marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.lastMessage}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontSize: 10.5, color: "rgba(240,240,255,0.3)" }}>{c.time}</span>
                  {c.aiHandled && <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 99, background: "rgba(139,92,246,0.12)", color: "#a78bfa", fontWeight: 700 }}>AI</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
