import transporter from "../config/mailer.js";
import resetPasswordEmail from "../utils/templates/resetPasswordEmail.js";
import verificationEmail from "../utils/templates/verificationEmail.js";

// const html = (url) => {
//   const url = url
//   return `
//   `
// }

export const sendVerificationEmail = async (user, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: `time.it@mail.com`,
    to: user.email,
    subject: "Verify your email address",
    html: verificationEmail(user.username, verifyUrl),
  });
};
export const sendResetPasswordEmail = async (user, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: `time.it@mail.com`,
    to: user.email,
    subject: "Reset password",
    html: resetPasswordEmail(user.username, resetUrl),
  });
};
