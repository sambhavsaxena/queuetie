export const graceful_shutdown = async (client) => {
    try {
        if (client.status !== "end") await client.quit();
        console.log("Redis connection closed");
    } catch (err) {
        if (!/Connection is closed/.test(err.message)) console.error(err);
    }
};
