Step by step process to send email through smtp

1. npm i nodemailer

2. create services folder at root directory

3. create emailService.js

4. setup SMTP Configuration in .env file

   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=<your-email>@gmail.com
   SMTP_PASSWORD=
   SMTP_FROM=<your-email>@gmail.com

5. create app password from gmail account settings

6. create transporter and verify it in emailService.js

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

7. send email
