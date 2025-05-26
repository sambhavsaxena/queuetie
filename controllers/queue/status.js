import { email_queue } from "../../core/connections.js";
import { Job } from "bullmq";

const get_job_status = async (req, res) => {
    try {
        const { job_id } = req.body;
        if (!job_id) {
            return res.status(400).json({ error: "Job ID is required." })
        }
        const job = await Job.fromId(email_queue, job_id);
        if (!job) {
            return res.status(404).json({ error: "Job has either been completed, or the Job ID is invalid." });
        }
        const state = await job.getState();
        return res.status(200).json({
            message: "success",
            data: {
                status: state,
                returnvalue: job.returnvalue,
                failedReason: job.failedReason,
                progress: job.progress,
                attemptsMade: job.attemptsMade,
                timestamp: job.timestamp,
                finishedOn: job.finishedOn,
                processedOn: job.processedOn,
            }
        })
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Get status failed: " + error.message });
    }
}

export default get_job_status;
