// import nodemailer from "nodemailer";

// export const sendEmail = async (email, subject, message) => {
//   const mailerConfig = {
//     host: "smtp.gmail.com",
//     service: "gmail",
//     secure: true,
//     SSL: true,
//     port: 465,
//     auth: {
//       user: "smtp@thesuitch.com",
//       pass: "geslztjkqejsblok",
//     },
//   };

//   const transporter = nodemailer.createTransport(mailerConfig);

//   const mailOptions = {
//     from: "dev@thesuitch.com",
//     to: email,
//     subject: subject,
//     html: message,
//   };
//   try {
//     const info = await transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("error => ", error);
//         return false;
//       } else {
//         console.log("info => ", info);
//         return true;
//       }
//     });
//     console.log("info => ", info);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

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
