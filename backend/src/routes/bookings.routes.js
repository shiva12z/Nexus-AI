import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import * as ctrl from "../controllers/bookings.controller.js";

const router = Router();
router.use(authenticate);

router.get("/", asyncHandler(ctrl.list));
router.get("/slots", asyncHandler(ctrl.slots));
router.post("/", asyncHandler(ctrl.create));

export default router;
