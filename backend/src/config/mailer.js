import nodemailer from "nodemailer";

let transporter;

if (process.env.NODE_ENV === "production") {
  // Sendgrid
  transporter = nodemailer.createTestAccount({
    service: "SendGrid",
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS,
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
