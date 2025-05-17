import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//import environment variables
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_SECURE = process.env.SMTP_SECURE;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_FROM = process.env.SMTP_FROM;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE === "true",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify((error, success) => {
  if (success) console.log("SMTP success", success);
  else console.log("SMTP Error", error);
});

export const sendEmail = async (to, subject, content) => {
  const mailOptions = {
    from: SMTP_FROM,
    to,
    subject,
    content,
  };

  try {
    await transporter.sendMail(mailOptions);
    // await transporter.sendMail((mailOptions, error) => {
    //   if (error) {
    //     console.log("Error during mail sending", error);
    //     throw error;
    //   }
    // });
  } catch (error) {
    console.log("Error received that happened during mail send");
  }
};
