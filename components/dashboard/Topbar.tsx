"use client";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronRight, Menu } from "lucide-react";
import { mockNotifications } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredUser, getInitials } from "@/lib/auth";

const pageLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/inbox": "Unified Inbox",
  "/dashboard/ai-assistant": "AI Assistant",
  "/dashboard/whatsapp": "WhatsApp",
  "/dashboard/instagram": "Instagram",
  "/dashboard/facebook": "Facebook",
  "/dashboard/voice": "Voice Calls",
  "/dashboard/leads": "Leads",
  "/dashboard/bookings": "Bookings",
  "/dashboard/knowledge": "Knowledge Base",
  "/dashboard/automations": "Automations",
  "/dashboard/analytics": "Analytics",
  "/dashboard/team": "Team",
  "/dashboard/integrations": "Integrations",
  "/dashboard/notifications": "Notifications",
  "/dashboard/settings": "Settings",
  "/dashboard/profile": "Profile",
};

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const [initials, setInitials] = useState("?");
  const unread = mockNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const u = getStoredUser();
    setInitials(getInitials(u?.full_name));
  }, [pathname]);

  const pageTitle = pageLabels[pathname] || "Dashboard";

  return (
    <header style={{
      height: 64,
      background: "rgba(7,7,14,0.9)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      gap: 16,
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 40,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
        <button
          className="mobile-menu-btn"
          aria-label="Open navigation menu"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </button>
        <span style={{ fontSize: 13, color: "rgba(240,240,255,0.35)" }} className="topbar-brand">NexusAI</span>
        <ChevronRight size={12} color="rgba(240,240,255,0.2)" />
        <span style={{ fontSize: 13, fontWeight: 600, color: "#f0f0ff" }}>{pageTitle}</span>
      </div>

      {/* Search */}
      <div className="topbar-search" style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 10,
        padding: "7px 14px",
        width: 240,
      }}>
        <Search size={14} color="rgba(240,240,255,0.3)" />
        <input
          placeholder="Search..."
          style={{
            background: "none", border: "none", outline: "none",
            fontSize: 13, color: "#f0f0ff", width: "100%",
          }}
        />
        <span style={{ fontSize: 11, color: "rgba(240,240,255,0.2)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "1px 5px" }}>⌘K</span>
      </div>

      {/* Notification bell */}
      <div style={{ position: "relative" }}>
        <button
          id="notif-bell"
          onClick={() => setNotifOpen(!notifOpen)}
          style={{
            width: 38, height: 38, borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", position: "relative",
          }}
        >
          <Bell size={16} color="rgba(240,240,255,0.6)" />
          {unread > 0 && (
            <div style={{
              position: "absolute", top: -3, right: -3,
              width: 16, height: 16, borderRadius: "50%",
              background: "#ef4444", color: "white",
              fontSize: 9, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid rgb(7,7,14)",
            }}>{unread}</div>
          )}
        </button>

        {/* Dropdown */}
        {notifOpen && (
          <div style={{
            position: "absolute", top: 46, right: 0,
            width: 340,
            background: "rgba(12,12,24,0.98)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            zIndex: 100,
            overflow: "hidden",
          }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#f0f0ff" }}>Notifications</span>
              <span className="badge badge-red" style={{ fontSize: 10 }}>{unread} new</span>
            </div>
            {mockNotifications.slice(0, 5).map(n => (
              <div key={n.id} style={{
                padding: "12px 18px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                background: n.read ? "transparent" : "rgba(139,92,246,0.05)",
                display: "flex", gap: 12, alignItems: "flex-start",
                cursor: "pointer",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: n.read ? "transparent" : "#8b5cf6",
                  marginTop: 5, flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f0f0ff", marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(240,240,255,0.45)" }}>{n.desc}</div>
                  <div style={{ fontSize: 11, color: "rgba(240,240,255,0.25)", marginTop: 4 }}>{n.time}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: "10px 18px", textAlign: "center" }}>
              <Link href="/dashboard/notifications" onClick={() => setNotifOpen(false)} style={{ fontSize: 12.5, color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>
                View all notifications →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Avatar */}
      <Link
        href="/dashboard/profile"
        style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.4))",
          border: "1.5px solid rgba(139,92,246,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#a78bfa", textDecoration: "none",
        }}
      >
        {initials}
      </Link>
    </header>
  );
}
