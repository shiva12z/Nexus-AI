import * as analyticsService from "../services/analyticsService.js";

export async function dashboard(req, res) {
  const stats = await analyticsService.getDashboardStats(req.teamId, parseInt(req.query.days || "30", 10));
  res.json({ success: true, data: stats });
}

export async function messageVolume(req, res) {
  const volume = await analyticsService.getMessageVolumeByDay(req.teamId, parseInt(req.query.days || "7", 10));
  res.json({ success: true, data: volume });
}
