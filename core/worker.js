import { Worker } from "bullmq";
import { email_job_handler } from "./job_handler.js";

export const init_email_worker = async (connection) => {
    const worker = new Worker("email-queue", email_job_handler, {
        connection,
        concurrency: 2,
        defaultJobOptions: {
            attempts: 3,
            removeOnComplete: { age: 3600, count: 1000 },
            removeOnFail: { age: 86400 },
            backoff: { type: "exponential", delay: 1000 },
        },
    });
    worker.on("ready", () => console.log("Worker is ready"));
    worker.on("resumed", () => console.log("Worker has been resumed"));
    worker.on("active", (job) => console.log(`Processing job ${job.id}`));
    worker.on("progress", (job, progress) => console.log(`Job ${job.id} progress: ${progress}`));
    worker.on("paused", () => console.log("Worker has been paused"));
    worker.on("completed", (job) => console.log(`Job ${job.id} completed`));
    worker.on("stalled", (job) => console.warn(`Job ${job.id} stalled and will be retried`));
    worker.on("failed", (job, err) => console.error(`Job ${job.id} failed: ${err.message}`));
    worker.on("error", (err) => console.error("Worker error:", err));
    worker.on("ioredis:close", () => console.log("Redis connection closed"));
    worker.on("closing", () => console.log("Worker is closing"));
    worker.on("closed", () => console.log("Worker has been closed"));
    worker.on("drained", () => console.log("All jobs have been processed"));
    return worker;
};
