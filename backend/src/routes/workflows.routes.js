import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate, requireRole } from "../middleware/auth.js";
import * as ctrl from "../controllers/workflows.controller.js";

const router = Router();
router.use(authenticate);

router.get("/", asyncHandler(ctrl.list));
router.post("/", requireRole("admin"), asyncHandler(ctrl.create));
router.patch("/:id", requireRole("admin"), asyncHandler(ctrl.update));

export default router;
