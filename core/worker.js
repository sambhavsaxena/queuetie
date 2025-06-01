import { Worker } from "bullmq";
import { email_job_handler } from "./job_handler.js";

export const init_email_worker = (connection) => {
    const worker = new Worker(
        "email-queue",
        email_job_handler,
        {
            connection,
            concurrency: 10,
            defaultJobOptions: {
                attempts: 3,
                backoff: { type: "exponential", delay: 1000 },
            },
        }
    );
    worker.on("active", (job) => console.log(`Job ${job.id} is active`));
    worker.on("ready", () => console.log("Worker is ready"));
    worker.on("error", (err) => console.error("Worker encountered error:", err));
    worker.on("failed", (job, err) =>
        console.error(`Job ${job.id} failed: ${err.message}`)
    );
    worker.on("completed", (job) =>
        console.log(`Job ${job.id} completed successfully`)
    );
    return worker;
};
