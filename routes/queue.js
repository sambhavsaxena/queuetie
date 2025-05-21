import express from "express";
import enqueue_controller from "../controllers/queue/enqueue.js";
import dequeue_controller from "../controllers/queue/dequeue.js";
import auth_middleware from "../middlewares/auth.js";

const router = express.Router();

router.route("/enqueue").post(enqueue_controller);
router.route("/dequeue").post(auth_middleware, dequeue_controller);

export default router;
