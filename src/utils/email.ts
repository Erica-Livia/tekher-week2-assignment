import { createTransporter } from "../config/mail-transport";


export async function sendVerificationEmail(email: string, verifyToken: string) {
  // @ts-ignore
  const link = `${process.env.FRONTEND_URL.replace(/\/$/, "")}/verify-email?token=${verifyToken}`;
  const transporter = await createTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h2>Welcome!</h2>
      <p>Click below to verify your email:</p>
      <a href="${link}">Verify my email</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
}

export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
  // @ts-ignore
  const link = `${process.env.FRONTEND_URL.replace(/\/$/, "")}/reset-password?token=${resetToken}`;
  const transporter = await createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send reset password email. Please try again later.');
  }
};