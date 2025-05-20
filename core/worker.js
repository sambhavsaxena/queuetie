import { Worker } from "bullmq";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Redis from "ioredis";

dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;

const worker_connection = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  tls: { rejectUnauthorized: true },
  maxRetriesPerRequest: null,
  retryStrategy: (times) => Math.min(times * 100, 3000),
  enableReadyCheck: false,
});

export const email_worker = new Worker(
  "email-queue",
  async (job) => {
    const {
      subject,
      body,
      attachments,
      to,
      from_user,
      from_service,
      from_password,
    } = job.data;
    const transporter = nodemailer.createTransport({
      service: from_service,
      auth: { user: from_user, pass: from_password },
    });

    console.log(`Processing job ${job.id}: ${job.name}`);
    const mailOptions = {
      from: `"Queuetie" <${from_user}>`,
      to,
      subject,
      html: body,
    };
    if (attachments && Array.isArray(attachments)) {
      mailOptions.attachments = attachments;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  },
  {
    connection: worker_connection,
    concurrency: 20,
    limiter: { max: 50, duration: 60_000 },
    settings: { lockDuration: 300000 },
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    },
  }
);

email_worker.on("failed", (job, err) =>
  console.error(`Job ${job.id} failed: ${err.message}`)
);

email_worker.on("completed", (job) =>
  console.log(`Job ${job.id} completed successfully`)
);

const safeQuit = async client => {
  try {
    if (client.status !== "end") await client.quit();
  } catch (err) {
    if (!/Connection is closed/.test(err.message)) console.error(err);
  }
};

process.on("SIGTERM", async () => {
  console.log("Worker shutting down…");
  await worker_connection.close({ closeConnection: false });
  await safeQuit(worker_connection);
  process.exit(0);
});

export { worker_connection };
