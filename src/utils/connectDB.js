import mongoose from "mongoose";
import dbConfig from "../config/dbConfig.js";
import logger from "../../src/logger/logger.js";

let db;
export const connectDB = () => {
  mongoose.set({
    strictQuery: true,
  });
  return mongoose
    .connect(dbConfig.db)
    .then((result) => {
      const mongo = mongoose.connection;
      db = mongo;
      logger.info("MongoDB Connected...");
    })
    .catch((err) => {
      logger.error("MongoDB connection error", err.message);
    });
};

export { db };
