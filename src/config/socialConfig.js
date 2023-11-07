import { config } from "dotenv";
config();

const SocialConfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};

export default SocialConfig;
