"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Bot, User, Calendar, Check, Bell } from "lucide-react";

const demoSequence = [
  {
    id: 1, role: "user", channel: "WhatsApp",
    text: "Hi! I saw your Instagram ad. How much does it cost?",
    delay: 800,
  },
  {
    id: 2, role: "ai",
    text: "Hi there! 👋 Our pricing starts at $49/month for small teams. Would you like me to walk you through our plans?",
    delay: 2200,
  },
  {
    id: 3, role: "user", channel: "WhatsApp",
    text: "Yes! And can I book a demo call?",
    delay: 4000,
  },
  {
    id: 4, role: "ai",
    text: "Absolutely! I have slots available today at 3 PM, 4 PM, or tomorrow at 10 AM. Which works?",
    delay: 5200,
  },
  {
    id: 5, role: "user", channel: "WhatsApp",
    text: "Today at 3 PM please!",
    delay: 7000,
  },
  {
    id: 6, role: "ai",
    text: "✅ Done! Your demo is booked for today at 3:00 PM. You'll get a confirmation SMS shortly.",
    delay: 8200,
  },
  {
    id: 7, role: "event", text: "🎯 Lead captured — Intent: Purchase (Score: 87)", delay: 9000, type: "lead" },
  {
    id: 8, role: "event", text: "📅 Booking created — Demo Call · Today 3:00 PM", delay: 9800, type: "booking" },
  {
    id: 9, role: "event", text: "🔔 Email notification sent to team@company.com", delay: 10600, type: "notify" },
];

export default function LiveDemo() {
  const [visibleMessages, setVisibleMessages] = useState<typeof demoSequence>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);

  const runDemo = () => {
    setVisibleMessages([]);
    setStarted(true);
    demoSequence.forEach((msg, i) => {
      setTimeout(() => {
        if (msg.role === "ai") setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(prev => [...prev, msg]);
        }, msg.role === "ai" ? 800 : 0);
      }, msg.delay);
    });
  };

  useEffect(() => {
    const timer = setTimeout(runDemo, 1000);
    return () => clearTimeout(timer);
  }, []);

  const eventColors: Record<string, string> = {
    lead: "#f59e0b", booking: "#10b981", notify: "#3b82f6",
  };

  return (
    <section id="live-demo" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge badge-green" style={{ marginBottom: 18, display: "inline-flex" }}>
              Live Demo
            </span>
            <h2 style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(30px, 5vw, 48px)",
              fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0ff", marginBottom: 16,
            }}>
              Watch AI close a lead in{" "}
              <span className="gradient-text">real time</span>
            </h2>
          </motion.div>
        </div>

        {/* Demo Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: "rgba(10,10,20,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {/* Header bar */}
          <div style={{
            background: "rgba(15,15,30,0.9)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "14px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Bot size={18} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f0f0ff" }}>NexusAI Assistant</div>
                <div style={{ fontSize: 11, color: "#25D366", display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#25D366" }} />
                  Online · WhatsApp
                </div>
              </div>
            </div>
            <button
              onClick={runDemo}
              style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
                color: "#a78bfa", cursor: "pointer",
              }}
            >
              ↺ Replay
            </button>
          </div>

          {/* Chat area */}
          <div style={{ padding: "24px 24px", minHeight: 380, display: "flex", flexDirection: "column", gap: 14 }}>
            <AnimatePresence>
              {visibleMessages.map((msg) => {
                if (msg.role === "event") {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        alignSelf: "center",
                        background: eventColors[msg.type!] + "18",
                        border: `1px solid ${eventColors[msg.type!]}35`,
                        borderRadius: 10,
                        padding: "8px 16px",
                        fontSize: 12.5, fontWeight: 600,
                        color: eventColors[msg.type!],
                      }}
                    >
                      {msg.text}
                    </motion.div>
                  );
                }

                if (msg.role === "user") {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ display: "flex", justifyContent: "flex-end", gap: 10, alignItems: "flex-end" }}
                    >
                      <div className="chat-bubble-user">{msg.text}</div>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <User size={14} color="#a78bfa" />
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: "flex", gap: 10, alignItems: "flex-end" }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Bot size={14} color="white" />
                    </div>
                    <div className="chat-bubble-ai">{msg.text}</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: "flex", gap: 10, alignItems: "flex-end" }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Bot size={14} color="white" />
                </div>
                <div className="chat-bubble-ai" style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{
                        width: 7, height: 7, borderRadius: "50%",
                        background: "#a78bfa",
                        animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.2; transform: scale(0.85); }
          30% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
