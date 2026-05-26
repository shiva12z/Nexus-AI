import { getSupabaseAdmin } from "../config/supabase.js";
import { createNotification } from "../notifications/service.js";
import { processWorkflows } from "../workflows/engine.js";
import { sendBookingConfirmationEmail } from "../notifications/email.js";
import { emitToTeam } from "../sockets/index.js";

export async function createBooking(teamId, data) {
  const supabase = getSupabaseAdmin();

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      team_id: teamId,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone,
      scheduled_at: data.scheduledAt,
      duration_minutes: data.durationMinutes || 30,
      meeting_type: data.meetingType || "consultation",
      channel: data.channel,
      lead_id: data.leadId,
      conversation_id: data.conversationId,
      assigned_to: data.assignedTo,
      status: "confirmed",
      notes: data.notes,
    })
    .select()
    .single();

  if (error) throw error;

  await createNotification({
    teamId,
    type: "booking",
    title: "AI booked a meeting",
    description: `${booking.contact_name} — ${new Date(booking.scheduled_at).toLocaleString()}`,
  });

  if (booking.contact_email) {
    await sendBookingConfirmationEmail(booking).catch(console.error);
  }

  emitToTeam(teamId, "booking:new", { booking });

  await processWorkflows({ teamId, trigger: "booking_created", payload: { booking } });

  await supabase.from("analytics_events").insert({
    team_id: teamId,
    event_type: "booking_created",
    channel: data.channel,
  });

  return booking;
}

export async function listBookings(teamId, { from, to } = {}) {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("bookings")
    .select("*, assigned:users!assigned_to(id, full_name)")
    .eq("team_id", teamId)
    .order("scheduled_at", { ascending: true });

  if (from) query = query.gte("scheduled_at", from);
  if (to) query = query.lte("scheduled_at", to);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getAvailableSlots(teamId, date) {
  // MVP: fixed business hours 9–17, 30-min slots
  const slots = [];
  const base = new Date(date);
  for (let hour = 9; hour < 17; hour++) {
    for (const min of [0, 30]) {
      const slot = new Date(base);
      slot.setHours(hour, min, 0, 0);
      if (slot > new Date()) slots.push(slot.toISOString());
    }
  }
  return slots;
}
