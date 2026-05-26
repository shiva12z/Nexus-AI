"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Inbox, Bot, MessageCircle, Camera, Share2,
  Phone, UserPlus, Calendar, Brain, GitBranch, BarChart3, Users,
  Plug, Bell, Settings, Zap, LogOut, X, User,
} from "lucide-react";
import { getStoredUser, getInitials, logout, type AuthUser } from "@/lib/auth";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",    href: "/dashboard" },
  { icon: Inbox,           label: "Unified Inbox", href: "/dashboard/inbox" },
  { icon: Bot,             label: "AI Assistant",  href: "/dashboard/ai-assistant" },
  { type: "divider", label: "Channels" },
  { icon: MessageCircle,   label: "WhatsApp",      href: "/dashboard/whatsapp",  color: "#25D366" },
  { icon: Camera,       label: "Instagram",     href: "/dashboard/instagram", color: "#E1306C" },
  { icon: Share2,        label: "Facebook",      href: "/dashboard/facebook",  color: "#1877F2" },
  { icon: Phone,           label: "Voice Calls",   href: "/dashboard/voice",     color: "#22d3ee" },
  { type: "divider", label: "Growth" },
  { icon: UserPlus,        label: "Leads",         href: "/dashboard/leads" },
  { icon: Calendar,        label: "Bookings",      href: "/dashboard/bookings" },
  { icon: Brain,           label: "Knowledge Base",href: "/dashboard/knowledge" },
  { icon: GitBranch,       label: "Automations",   href: "/dashboard/automations" },
  { type: "divider", label: "Insights" },
  { icon: BarChart3,       label: "Analytics",     href: "/dashboard/analytics" },
  { icon: Users,           label: "Team",          href: "/dashboard/team" },
  { type: "divider", label: "Account" },
  { icon: Plug,            label: "Integrations",  href: "/dashboard/integrations" },
  { icon: Bell,            label: "Notifications", href: "/dashboard/notifications", badge: 3 },
  { icon: User,            label: "Profile",       href: "/dashboard/profile" },
  { icon: Settings,        label: "Settings",      href: "/dashboard/settings" },
];

export default function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <>
      <aside className={`dashboard-sidebar ${open ? "open" : ""}`} style={{
      width: 240,
      minWidth: 240,
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      background: "rgba(7,7,14,0.97)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex",
      flexDirection: "column",
      zIndex: 50,
      overflowY: "auto",
      overflowX: "hidden",
    }}>
      {/* Logo */}
      <div style={{
        padding: "20px 18px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 16px rgba(139,92,246,0.4)",
          flexShrink: 0,
        }}>
          <Zap size={16} color="white" fill="white" />
        </div>
        <div>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 17, color: "#f0f0ff", letterSpacing: "-0.02em" }}>
            Nexus<span style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
          </div>
          <div style={{ fontSize: 10, color: "rgba(240,240,255,0.3)", letterSpacing: "0.04em", fontWeight: 600 }}>BUSINESS PLAN</div>
        </div>
        </div>
        <button className="sidebar-close-btn" aria-label="Close menu" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 10px" }}>
        {navItems.map((item, i) => {
          if (item.type === "divider") {
            return (
              <div key={i} style={{
                padding: "14px 8px 6px",
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(240,240,255,0.25)",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}>
                {item.label}
              </div>
            );
          }

          const Icon = item.icon!;
          const isActive = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href!);

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`sidebar-item ${isActive ? "active" : ""}`}
              onClick={onClose}
            >
              <Icon
                size={16}
                color={isActive ? "#a78bfa" : (item.color || "rgba(240,240,255,0.45)")}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: "#ef4444", color: "white",
                  fontSize: 10, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <Link
        href="/dashboard/profile"
        onClick={onClose}
        style={{
          padding: "12px 14px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))",
          border: "1px solid rgba(139,92,246,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#a78bfa",
        }}>
          {getInitials(user?.full_name)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f0f0ff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user?.full_name || "Account"}
          </div>
          <div style={{ fontSize: 11, color: "rgba(240,240,255,0.35)", textTransform: "capitalize" }}>{user?.role || "—"}</div>
        </div>
        <button
          type="button"
          aria-label="Sign out"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); logout(); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}
        >
          <LogOut size={15} color="rgba(240,240,255,0.3)" />
        </button>
      </Link>
    </aside>
    </>
  );
}
