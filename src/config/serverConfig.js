import { config } from "dotenv";
config();

const ServerConfig = {
  SERVER_PORT: process.env.SERVER_PORT || 7000,
  JWT_SECRET: process.env.JWT_SECRET,
  BEARER_TOKEN: process.env.BEARER_TOKEN,
  SALT: process.env.SALT_VAL,
};

export default ServerConfig;
