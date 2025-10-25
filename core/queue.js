import { Queue } from "bullmq";

export const init_email_queue = async (connection) => {
  const queue = new Queue("email-queue", { connection });

  queue.on("error", (err) => console.error("Email queue error:", err));
  queue.on("ioredis:close", () => console.warn("Email queue Redis connection closed"));
  queue.on("cleaned", (jobs) => console.log(`Cleaned ${jobs.length} jobs from the email queue`));
  queue.on("progress", (job) => console.log(`Job ${job.id} in progress`));
  queue.on("paused", () => console.log("Email queue paused"));
  queue.on("removed", (job) => console.log(`Job ${job.id} removed from the email queue`));
  queue.on("resumed", () => console.log("Email queue resumed"));
  queue.on("waiting", (job) => console.log(`Job ${job.id} is waiting in the ${queue.name} queue`));

  return queue;
};
