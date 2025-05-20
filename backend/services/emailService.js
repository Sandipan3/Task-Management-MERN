import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { text } from "express";
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
  if (success) console.log("SMTP success from emailservice.js ", success);
  else console.log("SMTP Error", error);
});

console.log("transpoter verification done now going to send email");

export const sendEmail = async (to, subject, content) => {
  try {
    const mailOptions = {
      from: SMTP_FROM,
      to,
      subject,
      text: "this is a text ",
      html: content,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error received that happened during mail send", error);
  }
};
