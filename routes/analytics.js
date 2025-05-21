import express from "express";
import { get_analytics } from "../controllers/analytics.js";
import auth_middleware from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(auth_middleware, get_analytics);

export default router;
