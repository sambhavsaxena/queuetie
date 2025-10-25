import { email_queue } from "./connections.js";

export const produce_email_enqueue_job = async ({ email, subject, body, attachments }) => {
  try {
    if (!email) throw new Error("Missing recipient email");

    const payload = {
      to: email,
      subject,
      body,
      attachments: attachments || [],
    };

    const job = await email_queue.add("send-email", payload, {
      removeOnComplete: { age: 3600, count: 1000 },
      removeOnFail: { age: 86400 * 3 }, // 3 days
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    });

    return job.id;
  } catch (err) {
    console.error("Error queueing email:", err);
    throw err;
  }
};
