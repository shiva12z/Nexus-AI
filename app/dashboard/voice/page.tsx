"use client";
import { mockCallLog } from "@/lib/mock-data";
import { Phone, PhoneCall, PhoneIncoming, PhoneOff, Mic, MicOff, Play, Square, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sentimentColors: Record<string, string> = { positive: "#10b981", neutral: "#3b82f6", negative: "#ef4444" };

function WaveformBar({ index, active }: { index: number; active: boolean }) {
  const [height, setHeight] = useState(4);

  useEffect(() => {
    if (!active) { setHeight(4); return; }
    const interval = setInterval(() => {
      setHeight(4 + Math.random() * 28);
    }, 80 + index * 15);
    return () => clearInterval(interval);
  }, [active, index]);

  return (
    <div style={{
      width: 3, borderRadius: 99,
      background: active ? "linear-gradient(to top, #8b5cf6, #3b82f6)" : "rgba(255,255,255,0.15)",
      height, transition: active ? "height 0.08s ease" : "height 0.3s ease",
      minHeight: 4,
    }} />
  );
}

export default function VoicePage() {
  const [callActive, setCallActive] = useState(false);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!callActive) { setElapsed(0); return; }
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [callActive]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Phone size={22} color="#22d3ee" />
        </div>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em" }}>AI Voice Agent</h1>
          <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)", marginTop: 2 }}>Handles inbound calls, qualifies leads, and books meetings</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 24 }}>
        {/* Call Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Live call card */}
          <div className="glass-card-elevated" style={{ padding: 28, textAlign: "center" }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: callActive ? "linear-gradient(135deg, rgba(34,211,238,0.25), rgba(59,130,246,0.25))" : "rgba(255,255,255,0.06)",
                border: callActive ? "2px solid rgba(34,211,238,0.5)" : "2px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto",
                boxShadow: callActive ? "0 0 30px rgba(34,211,238,0.25)" : "none",
                transition: "all 0.3s",
              }}>
                <Phone size={28} color={callActive ? "#22d3ee" : "rgba(240,240,255,0.4)"} />
              </div>
            </div>

            <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 4 }}>
              {callActive ? "Call in progress" : "No active call"}
            </div>
            {callActive && (
              <div style={{ fontSize: 20, fontWeight: 800, color: "#22d3ee", fontFamily: "Space Grotesk", letterSpacing: "0.04em", marginBottom: 12 }}>
                {fmt(elapsed)}
              </div>
            )}
            <div style={{ fontSize: 13, color: "rgba(240,240,255,0.4)", marginBottom: 24 }}>
              {callActive ? "+1 555 0201 · Maria Santos" : "Waiting for incoming call..."}
            </div>

            {/* Waveform */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, height: 44, marginBottom: 24 }}>
              {Array.from({ length: 40 }, (_, i) => (
                <WaveformBar key={i} index={i} active={callActive && !muted} />
              ))}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => setMuted(!muted)}
                disabled={!callActive}
                style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: muted ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.07)",
                  border: muted ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: callActive ? "pointer" : "not-allowed", opacity: callActive ? 1 : 0.4,
                  color: muted ? "#f87171" : "rgba(240,240,255,0.6)",
                }}>
                {muted ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button
                onClick={() => setCallActive(!callActive)}
                style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: callActive ? "#ef4444" : "linear-gradient(135deg, #25D366, #128C7E)",
                  border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: callActive ? "0 0 20px rgba(239,68,68,0.4)" : "0 0 20px rgba(37,211,102,0.4)",
                }}>
                {callActive ? <PhoneOff size={22} color="white" /> : <PhoneCall size={22} color="white" />}
              </button>
            </div>
            <p style={{ fontSize: 12, color: "rgba(240,240,255,0.3)", marginTop: 16 }}>
              {callActive ? "Click to end call" : "Click to simulate call"}
            </p>
          </div>

          {/* Stats */}
          <div className="glass-card-elevated" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 700, color: "#f0f0ff", marginBottom: 14 }}>Today's Stats</h3>
            {[
              { label: "Calls Handled", value: "24", color: "#22d3ee" },
              { label: "Leads Qualified", value: "8", color: "#10b981" },
              { label: "Meetings Booked", value: "5", color: "#8b5cf6" },
              { label: "Avg Duration", value: "3:28", color: "#f59e0b" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "rgba(240,240,255,0.5)" }}>{s.label}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel: transcript + call log */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Live Transcript */}
          <div className="glass-card-elevated" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff" }}>Live Transcript</h3>
              {callActive && <span className="badge badge-green">● Live</span>}
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 18, minHeight: 160, border: "1px solid rgba(255,255,255,0.05)" }}>
              {callActive ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { speaker: "AI", text: "Hello! Thank you for calling. How can I help you today?" },
                    { speaker: "Caller", text: "Hi, I'm interested in your enterprise pricing." },
                    { speaker: "AI", text: "Great! I can help with that. Could I get your name and company?" },
                    { speaker: "Caller", text: "It's Maria Santos from TechGrow..." },
                  ].map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: line.speaker === "AI" ? "#a78bfa" : "#22d3ee", minWidth: 48, paddingTop: 1 }}>{line.speaker}</span>
                      <span style={{ fontSize: 13.5, color: "rgba(240,240,255,0.65)", lineHeight: 1.5 }}>{line.text}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", animation: `typing-dot 1.2s ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", paddingTop: 40, color: "rgba(240,240,255,0.25)", fontSize: 13 }}>
                  Start a call to see live transcript
                </div>
              )}
            </div>
          </div>

          {/* Call Log */}
          <div className="glass-card-elevated" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 16 }}>Recent Call Log</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {mockCallLog.map(call => (
                <div key={call.id} style={{ display: "flex", gap: 14, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "rgba(240,240,255,0.5)", flexShrink: 0 }}>
                    {call.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff" }}>{call.name}</div>
                      <div style={{ fontSize: 11.5, color: "rgba(240,240,255,0.35)" }}>{call.date}</div>
                    </div>
                    <div style={{ fontSize: 12.5, color: "rgba(240,240,255,0.5)", marginBottom: 6, lineHeight: 1.5 }}>{call.summary}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 11, color: "rgba(240,240,255,0.35)" }}>⏱ {call.duration}</span>
                      <span style={{ fontSize: 11, padding: "1px 8px", borderRadius: 99, background: sentimentColors[call.sentiment] + "18", color: sentimentColors[call.sentiment], fontWeight: 700, textTransform: "capitalize" }}>
                        {call.sentiment}
                      </span>
                      {call.status === "escalated" && <span className="badge badge-orange" style={{ fontSize: 10 }}>Escalated</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing-dot { 0%, 60%, 100% { opacity: 0.2; } 30% { opacity: 1; } }
      `}</style>
    </div>
  );
}
