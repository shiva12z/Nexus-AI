import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import * as ctrl from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", authLimiter, asyncHandler(ctrl.signup));
router.post("/login", authLimiter, asyncHandler(ctrl.login));
router.get("/me", authenticate, asyncHandler(ctrl.me));
router.get("/team", authenticate, asyncHandler(ctrl.teamMembers));

export default router;
