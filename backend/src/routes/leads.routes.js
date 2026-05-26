import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import * as ctrl from "../controllers/leads.controller.js";

const router = Router();
router.use(authenticate);

router.get("/", asyncHandler(ctrl.list));
router.patch("/:id", asyncHandler(ctrl.update));

export default router;
