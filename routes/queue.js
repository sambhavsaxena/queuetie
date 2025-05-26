import express from "express";
import enqueue_controller from "../controllers/queue/enqueue.js";
import get_job_status from "../controllers/queue/status.js";
import reject_free_user_requests from "../middlewares/api.js"

const router = express.Router();

router.route("/enqueue").post(reject_free_user_requests, enqueue_controller);
router.route("/status").post(reject_free_user_requests, get_job_status);

export default router;
