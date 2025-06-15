import express from "express";
import multer from "multer";
import enqueue_controller from "../controllers/queue/enqueue.js";
import get_job_status from "../controllers/queue/status.js";
import reject_free_user_requests from "../middlewares/api.js"

const router = express.Router();
const upload = multer({
    dest: "uploads/",
    limits: {
        fileSize: 8 * 1024 * 1024, // 5 MB per file
        files: 5, // max 3 files allowed
    },
});

router.route("/enqueue").post(reject_free_user_requests, (req, res, next) => {
    upload.array("attachments")(req, res, function (err) {
        if (err?.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({ error: "File size exceeds 8MB limit." });
        }
        if (err?.code === "LIMIT_FILE_COUNT") {
            return res.status(413).json({ error: "Maximum 5 files allowed." });
        }
        if (err) {
            return res.status(500).json({ error: "File upload error: " + err.message });
        }
        enqueue_controller(req, res, next);
    });
});
router.route("/status").post(reject_free_user_requests, get_job_status);

export default router;
