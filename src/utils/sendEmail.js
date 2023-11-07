import nodemailer from "nodemailer";
import aws from "@aws-sdk/client-ses";
import SESConfig from "../config/sesConfig.js";

const ses = new aws.SES({
  region: SESConfig.SES_REGION,
  credentials: {
    accessKeyId: SESConfig.SES_ACCESS_KEY_ID,
    secretAccessKey: SESConfig.SES_SECRET_ACCESS_KEY,
  },
});

const transporter = nodemailer.createTransport({
  SES: {
    ses,
    aws: aws,
  },
});

export const sendEmail = async (email, subject, message) => {
  const mailOptions = {
    from: {
      name: SESConfig.SES_EMAIL_NAME,
      address: SESConfig.SES_EMAIL_ADDRESS,
    },
    to: email,
    subject: subject,
    html: message,
  };

  try {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error rrr  => ", error);
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.log("internal catch => ", error);
    return false;
  }
};
