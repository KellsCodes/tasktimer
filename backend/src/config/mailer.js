import nodemailer from "nodemailer";

let transporter;

if (process.env.NODE_ENV === "production") {
  // Gmail SMTP
  transporter = nodemailer.createTransport({
    service: process.env.GMAIL_SERVICE,
    host: process.env.GMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
} else {
  // Mailtrap for dev/staging
  transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
}

export default transporter;
