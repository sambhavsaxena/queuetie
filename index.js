import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import queue_routes from "./routes/queue.js";
import user_routes from "./routes/user.js";
import keys_routes from "./routes/keys.js";
import activity_routes from "./routes/activity.js";
import analytics_routes from "./routes/analytics.js";
import subscription_routes from "./routes/subscription.js"
import { not_found, error_handler } from "./middlewares/error.js";
import {
  initialize_connections,
  close_connections,
} from "./core/connections.js";

dotenv.config();
const { SERVER_PORT, FRONTEND_URL } = process.env;

const app = express();
await initialize_connections();

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.disable("x-powered-by"); // hides our deployment stack

app.use("/api/queue", queue_routes);
app.use("/api/user", user_routes);
app.use('/api/keys', keys_routes);
app.use('/api/activity', activity_routes);
app.use('/api/analytics', analytics_routes);
app.use('/api/subscription', subscription_routes);
app.use(not_found);
app.use(error_handler);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is healthy" });
});

process.on("SIGTERM", async () => {
  await close_connections();
  process.exit(0);
});

process.on("uncaughtException", async (error, origin) => {
  let error_message;
  switch (error.code) {
    case "EADDRINUSE":
      error_message = `Port ${port} is already in use`;
      break;
    default:
      error_message = `uncaughtException caught in node process: ${error}\nException origin: ${origin}`;
  }
  console.log(error_message);
  await close_connections();
  process.exit(1);
});

process.on("unhandledRejection", async (reason) => {
  console.log("Unhandled rejection", reason);
  await close_connections();
  process.exit(1);
});

process.on("SIGINT", async () => {
  await close_connections();
  process.exit(0);
});

app.listen(SERVER_PORT, () => {
  console.log(`Express connected on PORT: ${SERVER_PORT}`);
});
