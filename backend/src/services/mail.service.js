import transporter from "../config/mailer.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Resend } from "resend";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const logoPath = join(__dirname, "../../public/main-logo.webp");
// const logoBase64 = fs.readFileSync(logoPath).toString("base64");

// const attachments = [
//   {
//     filename: "logo.webp",
//     content: logoBase64,
//     cid: "appLogo",
//   },
// ];

export const sendAuthActionEmail = async (user, token, type) => {
  let message, subject, url, btnText; // type ===> 1 for email verification email, 2 for password reset email
  if (type === 1) {
    message =
      "Thanks for signing up! Please verify your email by clicking the button below:";
    subject = "Verify your email address";
    url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    btnText = "Verify Email";
  } else {
    message =
      "You received this email because you requested a password reset. Click below to reset your password.";
    subject = "Reset password";
    url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    btnText = "Reset Password";
  }
  try {
    const mailBody = await ejs.renderFile(
      path.join(__dirname, "../utils/templates/authEmailTemplate.ejs"),
      {
        data: {
          url,
          name: user?.profile?.firstname || user.username,
          message,
          btnText,
          logoURI: process.env.LOGO_URI,
          domain: process.env.FRONTEND_URL
        },
      },
      {
        async: true,
      }
    );
    const mailData = {
      to: user.email,
      subject,
      html: mailBody,
      // attachments,
    };
    if (process.env.NODE_ENV === "development") {
      const from = { name: "Time.it", email: `timeitemail@gmail.com` };
      await transporter.sendMail({ from, ...mailData });
    } else {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = "onboarding@resend.dev";
      const { data, error } = await resend.emails.send({ from, ...mailData });
      // console.log(error, { data });
    }
    console.log("mail sending completed");
  } catch (error) {
    console.log(error);
  }
};
