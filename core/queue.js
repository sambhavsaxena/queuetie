import { Queue } from "bullmq";

export const init_email_queue = (connection) => {
    const queue = new Queue("email-queue", {
        connection: connection.duplicate(),
    });

    queue.on("error", (err) => console.error("Email queue error:", err));
    queue.on("completed", (job) => console.log(`Job ${job.id} completed`));

    return queue;
};
