import transporter from "../config/mailer.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const attachments = [
  {
    filename: "logo.webp",
    path: join(__dirname, "../../public/main-logo.webp"),
    cid: "appLogo",
  },
];

export const sendAuthActionEmail = async (user, token, type) => {
  let message, subject, url; // type ===> 1 for email verification email, 2 for password reset email
  if (type === 1) {
    message =
      "Thanks for signing up! Please verify your email by clicking the button below:";
    subject = "Verify your email address";
    url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  } else {
    message =
      "You received this email because you requested a password reset. Click below to reset your password.";
    subject = "Reset password";
    url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  }
  try {
    const mailBody = await ejs.renderFile(
      path.join(__dirname, "../utils/templates/authEmailTemplate.ejs"),
      { data: { url, name: user?.profile?.firstname || user.username, message } },
      {
        async: true,
      }
    );
    await transporter.sendMail({
      from: { name: "Time.it", email: `timeitemail@gmail.com` },
      to: user.email,
      subject,
      html: mailBody,
      attachments,
    });
  } catch (error) {
    console.log(error);
  }
};
