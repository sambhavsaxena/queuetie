import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USERNAME,
    REDIS_PASSWORD,
} = process.env;

export const init_redis_connection = () => {
    return new Redis({
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
};
