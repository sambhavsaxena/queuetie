import dotenv from "dotenv";
dotenv.config();

import { create_mongodb_connection } from "../db/mongodb.js";
import { init_redis_connection } from "../db/redis.js";
import { init_email_worker } from "./worker.js";
import { init_email_queue } from "./queue.js";
import { graceful_shutdown } from "../utils/teardown.js";

let redis_connection, email_queue, email_worker;

export const initialize_connections = async () => {
  await create_mongodb_connection();
  redis_connection = await init_redis_connection();

  email_queue = await init_email_queue(redis_connection);
  email_worker = await init_email_worker(redis_connection);

  process.on("SIGINT", async () => await close_connections());
  process.on("SIGTERM", async () => await close_connections());
};

export const close_connections = async () => {
  try {
    if (email_queue) await email_queue.close();
    if (email_worker) await email_worker.close();
    await graceful_shutdown(redis_connection);
    console.log("All connections closed!");
  } catch (err) {
    console.error("Error closing connections:", err);
  } finally {
    process.exit(0);
  }
};

export { email_queue };
