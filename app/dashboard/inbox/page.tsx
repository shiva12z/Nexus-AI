"use client";
import { useState, useEffect, useRef } from "react";
import type { ReactElement } from "react";
import { Bot, User, Send, Phone, MoreHorizontal, Tag, UserPlus, StickyNote, Search, Filter, MessageCircle, Camera, Share2, Globe, CheckCheck, AlertCircle, Loader2 } from "lucide-react";
import { API_BASE, getToken, getStoredUser } from "@/lib/auth";
import { io } from "socket.io-client";

const channelIcons: Record<string, ReactElement> = {
  whatsapp:  <MessageCircle size={12} color="#25D366" />,
  instagram: <Camera size={12} color="#E1306C" />,
  facebook:  <Share2 size={12} color="#1877F2" />,
  webchat:   <Globe size={12} color="#8b5cf6" />,
};

const statusColors: Record<string, string> = {
  active: "#10b981", resolved: "#3b82f6", human: "#f59e0b",
};

const tabs = ["All", "WhatsApp", "Instagram", "Facebook", "Web Chat"];

const suggestedReplies = [
  "I'd be happy to help you with that!",
  "Let me check that for you right away.",
  "Could you provide more details?",
  "Your appointment has been confirmed.",
];

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [aiMode, setAiMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectedConvRef = useRef<any>(null);

  useEffect(() => {
    selectedConvRef.current = selectedConv;
  }, [selectedConv]);

  useEffect(() => {
    fetchConversations();

    const user = getStoredUser();
    const token = getToken();
    if (!user || !token) return;

    const socketUrl = API_BASE.replace('/api', '');
    const socket = io(socketUrl, {
      auth: { teamId: user.team_id, userId: user.id, token }
    });

    socket.on("message:new", (data: any) => {
      const { message, conversationId } = data;
      
      setConversations(prev => {
        const index = prev.findIndex(c => c.id === conversationId);
        if (index === -1) {
          fetchConversations();
          return prev;
        }
        const updated = [...prev];
        updated[index] = { ...updated[index], last_message_at: message.created_at };
        const [moved] = updated.splice(index, 1);
        return [moved, ...updated];
      });

      if (selectedConvRef.current?.id === conversationId) {
        setMessages(prev => {
          if (prev.find(m => m.id === message.id)) return prev;
          return [...prev, message];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_BASE}/conversations`, {
        headers: { "Authorization": `Bearer ${getToken()}` }
      });
      const data = await res.json();
      if (data.success) {
        setConversations(data.data);
        if (data.data.length > 0 && !selectedConv) {
          selectConversation(data.data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectConversation = async (conv: any) => {
    setSelectedConv(conv);
    try {
      const res = await fetch(`${API_BASE}/conversations/${conv.id}`, {
        headers: { "Authorization": `Bearer ${getToken()}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data.messages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || !selectedConv) return;
    const text = inputText;
    setInputText("");
    
    // Optimistic UI update
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, { id: tempId, sender: "agent", body: text, created_at: new Date().toISOString() }]);

    try {
      const res = await fetch(`${API_BASE}/conversations/${selectedConv.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
        body: JSON.stringify({ body: text })
      });
      const data = await res.json();
      if (data.success) {
        // Replace optimistic message with real message, handling potential socket race condition
        setMessages(prev => {
          if (prev.some(m => m.id === data.data.id)) {
            return prev.filter(m => m.id !== tempId);
          }
          return prev.map(m => m.id === tempId ? data.data : m);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = activeTab === "All"
    ? conversations
    : conversations.filter(c => {
        const map: Record<string, string> = { WhatsApp: "whatsapp", Instagram: "instagram", Facebook: "facebook", "Web Chat": "webchat" };
        return c.channel === map[activeTab];
      });

  return (
    <div style={{ display: "flex", width: "100%", maxWidth: "100%", height: "calc(100vh - 120px)", gap: 0, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Conversation List */}
      <div style={{ width: 320, minWidth: 320, flexShrink: 0, background: "rgba(10,10,20,0.9)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}>
        {/* Search */}
        <div style={{ padding: "14px 14px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 9, padding: "8px 12px" }}>
            <Search size={13} color="rgba(240,240,255,0.3)" />
            <input placeholder="Search conversations..." style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#f0f0ff", width: "100%" }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, padding: "0 12px 10px", overflowX: "auto" }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
              background: activeTab === tab ? "rgba(139,92,246,0.15)" : "transparent",
              border: activeTab === tab ? "1px solid rgba(139,92,246,0.3)" : "1px solid transparent",
              color: activeTab === tab ? "#a78bfa" : "rgba(240,240,255,0.45)",
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {isLoading ? (
            <div style={{ padding: 20, textAlign: "center", color: "rgba(240,240,255,0.4)" }}>
              <Loader2 size={20} className="animate-spin" style={{ margin: "0 auto", marginBottom: 10 }} />
              Loading conversations...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", color: "rgba(240,240,255,0.4)", fontSize: 13 }}>
              No conversations found.
            </div>
          ) : filtered.map(conv => {
            const avatarColor = "#8b5cf6"; // Fallback color
            const avatarText = (conv.contact_name || conv.external_id || "?").substring(0, 1).toUpperCase();
            
            return (
              <div key={conv.id} onClick={() => selectConversation(conv)} style={{
                padding: "12px 14px", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.04)",
                background: selectedConv?.id === conv.id ? "rgba(139,92,246,0.08)" : "transparent",
                borderLeft: selectedConv?.id === conv.id ? "2px solid #8b5cf6" : "2px solid transparent",
                transition: "background 0.15s",
              }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: avatarColor + "25",
                    border: `1.5px solid ${avatarColor}50`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: avatarColor,
                    flexShrink: 0,
                  }}>
                    {avatarText}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#f0f0ff" }}>{conv.contact_name || conv.external_id}</span>
                      <span style={{ fontSize: 10.5, color: "rgba(240,240,255,0.3)" }}>
                        {conv.last_message_at ? new Date(conv.last_message_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(240,240,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 5 }}>
                      {/* We could fetch last message body here, but for now just showing status or channel is fine */}
                      Connected via {conv.channel}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span>{channelIcons[conv.channel] || channelIcons.webchat}</span>
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%", background: statusColors[conv.status] || statusColors.active,
                      }} />
                      {conv.ai_handled && <span style={{ fontSize: 9.5, padding: "1px 6px", borderRadius: 99, background: "rgba(139,92,246,0.12)", color: "#a78bfa", fontWeight: 700 }}>AI</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area & AI Insights */}
      <div style={{ flex: 1, minWidth: 0, display: "flex" }}>
        {/* Chat Window */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: "rgba(8,8,16,0.95)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div style={{
                padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", gap: 12, flexShrink: 0
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "#8b5cf625", border: `1.5px solid #8b5cf650`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#8b5cf6",
                }}>
                  {(selectedConv.contact_name || selectedConv.external_id || "?").substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f0ff" }}>{selectedConv.contact_name || selectedConv.external_id}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(240,240,255,0.4)" }}>
                    {channelIcons[selectedConv.channel]}
                    <span style={{ textTransform: "capitalize" }}>{selectedConv.channel}</span>
                    <span>·</span>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: statusColors[selectedConv.status] || statusColors.active }} />
                    <span style={{ textTransform: "capitalize" }}>{selectedConv.status}</span>
                  </div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                  {/* AI mode toggle */}
                  <button onClick={() => setAiMode(!aiMode)} style={{
                    display: "flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 8, cursor: "pointer",
                    background: aiMode ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.05)",
                    border: aiMode ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    color: aiMode ? "#a78bfa" : "rgba(240,240,255,0.45)", fontSize: 12, fontWeight: 600,
                  }}>
                    <Bot size={13} /> {aiMode ? "AI Active" : "Human Mode"}
                  </button>
                  <button style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(240,240,255,0.5)" }}>
                    <UserPlus size={14} />
                  </button>
                  <button style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(240,240,255,0.5)" }}>
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                {messages.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} style={{ textAlign: "center" }}>
                        <span style={{ fontSize: 11.5, padding: "5px 14px", borderRadius: 99, background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)" }}>
                          ⚠️ {msg.body}
                        </span>
                      </div>
                    );
                  }
                  if (msg.sender === "user") {
                    return (
                      <div key={msg.id} style={{ display: "flex", justifyContent: "flex-start", gap: 8, alignItems: "flex-end" }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#3b82f625", border: `1px solid #3b82f640`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#3b82f6", flexShrink: 0 }}>
                          U
                        </div>
                        <div>
                          <div className="chat-bubble-ai">{msg.body}</div>
                          <div style={{ fontSize: 10.5, color: "rgba(240,240,255,0.25)", marginTop: 4 }}>
                            {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={msg.id} style={{ display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "flex-end" }}>
                      <div>
                        <div className="chat-bubble-user" style={{ background: msg.sender === "ai" ? "rgba(139,92,246,0.15)" : "#8b5cf6" }}>
                          {msg.body}
                        </div>
                        <div style={{ fontSize: 10.5, color: "rgba(240,240,255,0.25)", textAlign: "right", marginTop: 4 }}>
                          {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} · {msg.sender === "ai" ? "AI" : "You"}
                        </div>
                      </div>
                      {msg.sender === "ai" && (
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Bot size={12} color="white" />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* AI Suggested Replies */}
              {aiMode && (
                <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0, maxWidth: "100%" }}>
                  <span style={{ fontSize: 11, color: "rgba(240,240,255,0.3)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
                    <Bot size={11} color="#a78bfa" /> Suggested:
                  </span>
                  {suggestedReplies.map((reply, i) => (
                    <button key={i} onClick={() => setInputText(reply)} style={{
                      padding: "5px 12px", borderRadius: 99, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
                      background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa",
                    }}>
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10, alignItems: "flex-end", flexShrink: 0, maxWidth: "100%" }}>
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  rows={1}
                  style={{
                    flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10, padding: "10px 14px", fontSize: 13.5, color: "#f0f0ff", resize: "none", outline: "none",
                  }}
                />
                <button onClick={sendMessage} style={{
                  width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", border: "none", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(139,92,246,0.3)",
                }}>
                  <Send size={16} color="white" />
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,240,255,0.4)" }}>
              Select a conversation to view messages
            </div>
          )}
        </div>

        {/* AI Intelligence Sidebar */}
        <div style={{ width: 280, minWidth: 280, flexShrink: 0, background: "rgba(10,10,20,0.95)", display: "flex", flexDirection: "column", overflowY: "auto", padding: 20 }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#f0f0ff", margin: "0 0 20px 0" }}>
            <Bot size={16} color="#a78bfa" /> AI Intelligence
          </h3>
          
          {selectedConv ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Lead Score */}
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Lead Score</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: selectedConv.metadata?.ai_score > 80 ? "#10b981" : "#f59e0b" }}>
                  {selectedConv.metadata?.ai_score || "--"}
                </div>
                <div style={{ fontSize: 12, marginTop: 4, color: "rgba(255,255,255,0.6)", textTransform: "capitalize" }}>
                  Intent: <strong style={{ color: "white" }}>{selectedConv.metadata?.ai_intent || "Unknown"}</strong>
                </div>
              </div>

              {/* Sentiment */}
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Sentiment</div>
                <div style={{ fontSize: 16, fontWeight: 700, textTransform: "capitalize", color: "#f0f0ff" }}>
                  {selectedConv.metadata?.ai_sentiment || "Analyzing..."}
                </div>
              </div>

              {/* CRM Recommendation */}
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Next Action</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#8b5cf6", marginBottom: 6 }}>
                  {selectedConv.metadata?.ai_next_action || "Wait"}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
                  {selectedConv.metadata?.ai_reason || "No immediate action required."}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: 40 }}>
              Select a conversation to see AI insights.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
