import { config } from "dotenv";
config();

const SESConfig = {
  SES_REGION: process.env.SES_REGION,
  SES_ACCESS_KEY_ID: process.env.SES_ACCESS_KEY_ID,
  SES_SECRET_ACCESS_KEY: process.env.SES_SECRET_ACCESS_KEY,
  SES_EMAIL_NAME: process.env.SES_EMAIL_NAME,
  SES_EMAIL_ADDRESS: process.env.SES_EMAIL_ADDRESS,
};

export default SESConfig;
