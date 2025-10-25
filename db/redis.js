import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USERNAME,
    REDIS_PASSWORD,
} = process.env;

export const init_redis_connection = async () => {
    const connection = new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT,
        username: REDIS_USERNAME,
        password: REDIS_PASSWORD,
        tls: { rejectUnauthorized: true },
        maxRetriesPerRequest: null,
        retryStrategy: (times) => {
            console.log("Retry attempt:", times);
            return Math.min(times * 100, 3000);
        },
        enableReadyCheck: true,
    });
    connection.on("connect", () => console.log("Redis connected: " + connection.options.host));
    connection.on("ready", () => console.log("Queue is ready"));
    connection.on("end", () => console.log("Redis connection ended"));
    connection.on("error", (err) => console.error("Redis error:", err));
    connection.on("close", () => console.log("Redis connection closed"));
    connection.on("reconnecting", (time) => console.log("Reconnecting to Redis in", time, "ms"));
    connection.on("message", (channel, message) => console.log(`Message received from ${channel}: ${message}`));
    return connection;
};
