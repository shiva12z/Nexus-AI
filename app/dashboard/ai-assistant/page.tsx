"use client";
import { Bot, Brain, MessageCircle, Zap, RefreshCw, Send, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { API_BASE, getToken } from "@/lib/auth";

const quickPrompts = [
  "What are our business hours?",
  "How does the AI training work?",
  "Show me our top leads",
  "What's our AI response rate today?",
  "Help me write a WhatsApp template",
];

const conversation = [
  { role: "ai", text: "Hi! I'm your NexusAI assistant. I can help you manage conversations, analyze performance, and train your AI. What would you like to do?" },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState(conversation);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMsg = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const newMsg = { role: "user", text };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          message: text,
          history: messages.filter(m => m.role !== "system").slice(-5) // Send last 5 messages for context
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to get response");
      }

      setMessages(prev => [...prev, {
        role: "ai",
        text: data.data.text
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "ai",
        text: "Sorry, I ran into an error connecting to the server. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.25))",
          border: "1px solid rgba(139,92,246,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 24px rgba(139,92,246,0.2)",
        }}>
          <Bot size={24} color="#a78bfa" />
        </div>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em" }}>AI Assistant</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 13, color: "#10b981", fontWeight: 600 }}>Powered by GPT-4o · Always available</span>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { icon: <Brain size={18} />, label: "Analyze Performance", desc: "Get insights from your data", color: "#8b5cf6" },
          { icon: <MessageCircle size={18} />, label: "Draft Responses", desc: "Write AI-optimized replies", color: "#3b82f6" },
          { icon: <Zap size={18} />, label: "Automate Tasks", desc: "Create workflows with voice", color: "#f59e0b" },
          { icon: <RefreshCw size={18} />, label: "Train Knowledge", desc: "Add new content via chat", color: "#10b981" },
        ].map(cap => (
          <div key={cap.label} className="glass-card" style={{ padding: "16px 18px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: cap.color + "18", border: `1px solid ${cap.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: cap.color, marginBottom: 12 }}>
              {cap.icon}
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0f0ff", marginBottom: 4 }}>{cap.label}</div>
            <div style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>{cap.desc}</div>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="glass-card-elevated" style={{ display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 420 }}>
        {/* Chat area */}
        <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", gap: 10, justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-start" }}>
              {msg.role === "ai" && (
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Bot size={14} color="white" />
                </div>
              )}
              <div className={msg.role === "ai" ? "chat-bubble-ai" : "chat-bubble-user"} style={{ maxWidth: "70%", whiteSpace: "pre-wrap" }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-start", alignItems: "flex-start" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={14} color="white" />
              </div>
              <div className="chat-bubble-ai" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Loader2 size={14} className="animate-spin" /> Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8, overflowX: "auto" }}>
          {quickPrompts.map(p => (
            <button key={p} onClick={() => sendMsg(p)} style={{
              padding: "5px 12px", borderRadius: 99, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
              background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa",
            }}>{p}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMsg(input)}
            placeholder="Ask your AI assistant anything..."
            style={{
              flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, padding: "10px 14px", fontSize: 13.5, color: "#f0f0ff", outline: "none",
            }}
          />
          <button onClick={() => sendMsg(input)} style={{
            width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
            border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <Send size={16} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
