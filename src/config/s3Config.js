import { config } from "dotenv";
config();

const S3Config = {
  S3_BUCKET_URL: process.env.S3_BUCKET_URL,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
};

export default S3Config;
