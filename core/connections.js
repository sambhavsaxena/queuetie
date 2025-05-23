import { Queue } from "bullmq";
import Redis from "ioredis";
import dotenv from "dotenv";

import { create_mongodb_connection } from "../db/server.js";

dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;

let redis_connection;
let email_queue;

export const initialize_connections = async () => {
  await create_mongodb_connection();

  redis_connection = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    tls: { rejectUnauthorized: true },
    maxRetriesPerRequest: 5,
    retryStrategy: (times) => {
      console.log("Retry attempt:", times);
      return Math.min(times * 100, 3000);
    },
    enableReadyCheck: true,
  });

  redis_connection.on("connect", () => console.log("Redis connected"));
  redis_connection.on("ready", () => console.log("Redis ready"));
  redis_connection.on("end", () => console.log("Redis connection closed"));
  redis_connection.on("error", (err) => console.error("Redis error:", err));

  email_queue = new Queue("email-queue", {
    connection: redis_connection.duplicate(),
  });
  email_queue.on("error", (err) => console.error("Email queue error:", err));
  email_queue.on("completed", (job) => console.log(`Job ${job.id} completed`));
};

const safeQuit = async (client) => {
  try {
    if (client.status !== "end") await client.quit();
    console.log("Redis connection closed");
  } catch (err) {
    if (!/Connection is closed/.test(err.message)) console.error(err);
  }
};

export const close_connections = async () => {
  await email_queue.close();
  await safeQuit(redis_connection);
};

export { email_queue };
