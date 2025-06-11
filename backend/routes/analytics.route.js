
import express from "express";
import { getAnalyticsData, getShipmentStatistics } from "../controllers/analytics.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAnalyticsData);
router.get("/statistics", protectRoute, adminRoute, getShipmentStatistics);

export default router;
