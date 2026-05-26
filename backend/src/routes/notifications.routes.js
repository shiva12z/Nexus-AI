import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import * as ctrl from "../controllers/notifications.controller.js";

const router = Router();
router.use(authenticate);

router.get("/", asyncHandler(ctrl.list));
router.post("/read-all", asyncHandler(ctrl.markAllRead));

export default router;
