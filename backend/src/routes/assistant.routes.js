import { Router } from "express";
import { handleAssistantChat } from "../controllers/assistantController.js";

const router = Router();

// In a real app, this should have authentication middleware, e.g. router.use(requireAuth);
router.post("/", handleAssistantChat);

export default router;
