import express from "express";
import razorpay_controller from "../controllers/payment/razorpay.js";
import auth_middleware from "../middlewares/auth.js";

const router = express.Router();

router.route("/razorpay").post(auth_middleware, razorpay_controller);

export default router;
