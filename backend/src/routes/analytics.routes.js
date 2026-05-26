import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import * as ctrl from "../controllers/analytics.controller.js";

const router = Router();
router.use(authenticate);

router.get("/dashboard", asyncHandler(ctrl.dashboard));
router.get("/message-volume", asyncHandler(ctrl.messageVolume));

export default router;
