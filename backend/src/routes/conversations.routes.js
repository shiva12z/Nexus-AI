import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import * as ctrl from "../controllers/conversations.controller.js";

const router = Router();
router.use(authenticate);

router.get("/", asyncHandler(ctrl.list));
router.get("/:id", asyncHandler(ctrl.getById));
router.post("/:id/messages", asyncHandler(ctrl.sendMessage));
router.patch("/:id/assign", asyncHandler(ctrl.assign));
router.patch("/:id/status", asyncHandler(ctrl.updateStatus));

export default router;
