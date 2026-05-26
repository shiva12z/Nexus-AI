import * as notificationService from "../notifications/service.js";

export async function list(req, res) {
  const notifications = await notificationService.listNotifications(
    req.teamId,
    req.user.id,
    { unreadOnly: req.query.unread === "true" }
  );
  res.json({ success: true, data: notifications });
}

export async function markAllRead(req, res) {
  await notificationService.markAllRead(req.teamId, req.user.id);
  res.json({ success: true });
}
