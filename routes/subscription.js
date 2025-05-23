import express from "express";
import {create_order, set_order_active} from "../controllers/subscription/razorpay.js";
import auth_middleware from "../middlewares/auth.js";

const router = express.Router();

router.route("/razorpay").post(auth_middleware, create_order);
router.route("/razorpay").put(auth_middleware, set_order_active);

export default router;
