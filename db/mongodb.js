import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const create_mongodb_connection = async () => {
  try {
    if (mongoose.connection.readyState !== 0) return;
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
