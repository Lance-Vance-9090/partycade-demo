import { config } from "dotenv";
config();

const ServerConfig = {
  SERVER_PORT: process.env.SERVER_PORT || 7000,
};

export default ServerConfig;
