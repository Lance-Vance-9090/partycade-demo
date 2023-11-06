import { config } from "dotenv";

config();

const dbConfig = {

  db: process.env.DB_URI,
};

export default dbConfig;