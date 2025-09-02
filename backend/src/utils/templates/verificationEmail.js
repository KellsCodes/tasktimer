export default function verificationEmail(name, url) {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.5">
      <h2>Hi ${name || "there"},</h2>
      <p>Thanks for signing up! Please verify your email by clicking the button below:</p>
      <a href="${url}" 
         style="background:#4F46E5; color:#fff; padding:10px 15px; 
                text-decoration:none; border-radius:5px; display:inline-block;">
        Verify Email
      </a>
      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p style="color: #4299e1">${url}</p>
    </div>
  `;
}
