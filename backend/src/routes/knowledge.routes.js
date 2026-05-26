import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import * as ctrl from "../controllers/knowledge.controller.js";

const router = Router();
router.use(authenticate);

router.get("/", asyncHandler(ctrl.list));
router.post("/", asyncHandler(ctrl.create));
router.post("/:id/train", asyncHandler(ctrl.train));
router.delete("/:id", asyncHandler(ctrl.remove));

export default router;
