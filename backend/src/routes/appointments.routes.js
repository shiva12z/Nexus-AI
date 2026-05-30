import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import * as ctrl from "../controllers/appointments.controller.js";

const router = Router();
router.use(authenticate);

router.get("/", asyncHandler(ctrl.list));

export default router;
