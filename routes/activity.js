import express from "express";
import { get_recent_activity } from "../controllers/activity.js";
import auth_middleware from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(auth_middleware, get_recent_activity);

export default router;
