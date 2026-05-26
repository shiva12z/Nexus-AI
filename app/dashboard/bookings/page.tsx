"use client";
import { mockBookings } from "@/lib/mock-data";
import { Calendar, Clock, Video, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const today = new Date();
const currentMonth = today.toLocaleString("default", { month: "long", year: "numeric" });

function buildCalendar() {
  const first = new Date(today.getFullYear(), today.getMonth(), 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const cells: (number | null)[] = Array(startDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const statusColors: Record<string, string> = { confirmed: "#10b981", pending: "#f59e0b" };
const channelColors: Record<string, string> = { WhatsApp: "#25D366", Instagram: "#E1306C", Facebook: "#1877F2", "Web Chat": "#8b5cf6" };

export default function BookingsPage() {
  const calCells = buildCalendar();
  const bookingDays = mockBookings.map(b => parseInt(b.date.split("-")[2]));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em", marginBottom: 4 }}>
            Booking Management
          </h1>
          <p style={{ fontSize: 13.5, color: "rgba(240,240,255,0.45)" }}>
            {mockBookings.filter(b => b.status === "confirmed").length} confirmed · {mockBookings.filter(b => b.status === "pending").length} pending
          </p>
        </div>
        <button className="btn-primary" style={{ fontSize: 13, padding: "9px 18px" }}>
          <Plus size={14} /> New Booking
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24 }}>
        {/* Calendar */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff" }}>{currentMonth}</span>
            <div style={{ display: "flex", gap: 4 }}>
              <button style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(240,240,255,0.5)" }}><ChevronLeft size={14} /></button>
              <button style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(240,240,255,0.5)" }}><ChevronRight size={14} /></button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
            {days.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 10.5, fontWeight: 700, color: "rgba(240,240,255,0.3)", letterSpacing: "0.04em", padding: "4px 0" }}>{d}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {calCells.map((day, i) => {
              if (!day) return <div key={i} />;
              const isToday = day === today.getDate();
              const hasBooking = bookingDays.includes(day);
              return (
                <div key={i} style={{
                  aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, cursor: "pointer", fontSize: 13,
                  background: isToday ? "linear-gradient(135deg, #8b5cf6, #3b82f6)" : hasBooking ? "rgba(139,92,246,0.1)" : "transparent",
                  color: isToday ? "white" : "#f0f0ff",
                  fontWeight: isToday ? 700 : 400,
                  border: hasBooking && !isToday ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                  position: "relative",
                }}>
                  {day}
                  {hasBooking && !isToday && (
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#8b5cf6", position: "absolute", bottom: 3 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bookings List */}
        <div className="glass-card-elevated" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff", marginBottom: 18 }}>Upcoming Meetings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {mockBookings.map(booking => (
              <div key={booking.id} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "14px 18px",
                background: "rgba(255,255,255,0.03)", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.05em" }}>
                    {new Date(booking.date).toLocaleString("default", { month: "short" }).toUpperCase()}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#f0f0ff", lineHeight: 1 }}>
                    {booking.date.split("-")[2]}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0ff", marginBottom: 3 }}>{booking.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "rgba(240,240,255,0.5)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} /> {booking.time}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(240,240,255,0.5)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Video size={11} /> {booking.type}
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: statusColors[booking.status] + "18", color: statusColors[booking.status] }}>
                  {booking.status}
                </span>
                <span style={{ fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: channelColors[booking.channel] + "18", color: channelColors[booking.channel] }}>
                  {booking.channel}
                </span>
                <span style={{ fontSize: 12, color: "rgba(240,240,255,0.4)" }}>{booking.agent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
