import express from "express";
import multer from "multer";
import enqueue_controller from "../controllers/queue/enqueue.js";
import get_job_status from "../controllers/queue/status.js";
import reject_free_user_requests from "../middlewares/api.js"

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/enqueue").post(reject_free_user_requests, upload.array("attachments"), enqueue_controller);
router.route("/status").post(reject_free_user_requests, get_job_status);

export default router;
