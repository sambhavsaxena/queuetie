import express from "express";
import { get_analytics } from "../controllers/analytics.js";
import reject_free_user_requests from "../middlewares/api.js"

const router = express.Router();

router.route("/").get(reject_free_user_requests, get_analytics);

export default router;
