import * as bookingService from "../services/bookingService.js";

export async function list(req, res) {
  const bookings = await bookingService.listBookings(req.teamId, {
    from: req.query.from,
    to: req.query.to,
  });
  res.json({ success: true, data: bookings });
}

export async function create(req, res) {
  const booking = await bookingService.createBooking(req.teamId, req.body);
  res.status(201).json({ success: true, data: booking });
}

export async function slots(req, res) {
  const slots = await bookingService.getAvailableSlots(req.teamId, req.query.date);
  res.json({ success: true, data: slots });
}
