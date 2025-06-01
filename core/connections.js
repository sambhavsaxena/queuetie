import dotenv from "dotenv";
dotenv.config();

import { create_mongodb_connection } from "../db/mongodb.js";
import { init_redis_connection } from "../db/redis.js";
import { init_email_worker } from "./worker.js";
import { init_email_queue } from "./queue.js";
import { graceful_shutdown } from "../utils/teardown.js";

let redis_connection, email_queue;

export const initialize_connections = async () => {
  await create_mongodb_connection();

  redis_connection = init_redis_connection();
  redis_connection.on("connect", () => console.log("Redis connected: " + redis_connection.options.host));
  redis_connection.on("ready", () => console.log("Queue is ready"));
  redis_connection.on("end", () => console.log("Redis connection closed"));
  redis_connection.on("error", (err) => console.error("Redis error:", err));

  email_queue = init_email_queue(redis_connection);
  init_email_worker(redis_connection);
};

export const close_connections = async () => {
  await email_queue.close();
  await graceful_shutdown(redis_connection);
};

export { email_queue };
