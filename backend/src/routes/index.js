import { Router } from "express";
import authRoutes from "./auth.routes.js";
import conversationsRoutes from "./conversations.routes.js";
import leadsRoutes from "./leads.routes.js";
import bookingsRoutes from "./bookings.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import knowledgeRoutes from "./knowledge.routes.js";
import workflowsRoutes from "./workflows.routes.js";
import notificationsRoutes from "./notifications.routes.js";
import integrationsRoutes from "./integrations.routes.js";
import assistantRoutes from "./assistant.routes.js";
import whatsappWebhook from "../webhooks/whatsapp.webhook.js";
import metaWebhook from "../webhooks/meta.webhook.js";
import webchatWebhook from "../webhooks/webchat.webhook.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "nexusai-api",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/conversations", conversationsRoutes);
router.use("/leads", leadsRoutes);
router.use("/bookings", bookingsRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/knowledge-base", knowledgeRoutes);
router.use("/workflows", workflowsRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/integrations", integrationsRoutes);
router.use("/assistant", assistantRoutes);

// Webhooks (no JWT — signature validated per channel)
router.use("/webhooks/whatsapp", whatsappWebhook);
router.use("/webhooks/meta", metaWebhook);
router.use("/webhooks/webchat", webchatWebhook);

export default router;
