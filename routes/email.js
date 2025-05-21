import express from "express";
import { get_emails_count_by_user } from "../controllers/email.js";
import auth_middleware from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(auth_middleware, get_emails_count_by_user);

export default router;
