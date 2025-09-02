import transporter from "../config/mailer.js";
import verificationEmail from "../utils/templates/verificationEmail.js";

export const sendVerificationEmail = async (user, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: `time.it@mail.com`,
    to: user.email,
    subject: "Verify your email address",
    html: verificationEmail(user.username, verifyUrl)
  })
};
