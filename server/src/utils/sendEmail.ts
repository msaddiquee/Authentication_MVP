import nodemailer from "nodemailer";
import type { SendMailOptions, SentMessageInfo } from "nodemailer";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  attachments?: SendMailOptions["attachments"];
}

export const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Non-blocking verification on startup
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter.verify((error) => {
    if (error) {
      console.warn("⚠️ Email transporter verification failed:", error.message);
    } else {
      console.log("✅ Email service is ready to send messages");
    }
  });
}

/**
 * Sends an email using the configured nodemailer transporter.
 */
export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  from = process.env.EMAIL_FROM || process.env.EMAIL_USER,
  replyTo,
  attachments,
}: SendEmailOptions): Promise<SentMessageInfo> => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error("Email credentials (EMAIL_USER and EMAIL_PASSWORD) are not configured in environment variables.");
  }

  const sender = from || process.env.EMAIL_USER;

  const mailOptions: SendMailOptions = {
    from: `"${process.env.APP_NAME || "Authentication App"}" <${sender}>`,
    to,
    subject,
    text,
    html,
    replyTo,
    attachments,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

/**
 * Helper: Send a welcome email to newly registered users
 */
// export const sendWelcomeEmail = async (to: string, name: string): Promise<SentMessageInfo> => {
//   const subject = "Welcome to Our Platform!";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
//       <h2 style="color: #333;">Welcome, ${name}!</h2>
//       <p style="color: #555; line-height: 1.6;">
//         Thank you for creating an account with us. We're excited to have you on board.
//       </p>
//       <p style="color: #555; line-height: 1.6;">
//         If you have any questions or need assistance, feel free to reply to this email.
//       </p>
//       <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
//       <p style="color: #999; font-size: 12px;">This is an automated notification. If you didn't create an account, please disregard this email.</p>
//     </div>
//   `;

//   return sendEmail({
//     to,
//     subject,
//     text: `Welcome, ${name}! Thank you for signing up.`,
//     html,
//   });
// };

/**
 * Helper: Send email verification link
 */
export const sendVerificationEmail = async (to: string, verificationUrl: string): Promise<SentMessageInfo> => {
  const subject = "Verify Your Email Address";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #333;">Email Verification</h2>
      <p style="color: #555; line-height: 1.6;">
        Please click the button below to verify your email address and activate your account:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
          Verify Email
        </a>
      </div>
      <p style="color: #777; font-size: 14px;">
        Or copy and paste this link into your browser:<br />
        <a href="${verificationUrl}" style="color: #007bff;">${verificationUrl}</a>
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #999; font-size: 12px;">This link will expire soon. If you did not request this, please ignore this email.</p>
    </div>
  `;

  return sendEmail({
    to,
    subject,
    text: `Please verify your email address by visiting: ${verificationUrl}`,
    html,
  });
};

/**
 * Helper: Send password reset email
 */
// export const sendPasswordResetEmail = async (to: string, resetUrl: string): Promise<SentMessageInfo> => {
//   const subject = "Reset Your Password";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
//       <h2 style="color: #333;">Password Reset Request</h2>
//       <p style="color: #555; line-height: 1.6;">
//         We received a request to reset your password. Click the button below to choose a new password:
//       </p>
//       <div style="text-align: center; margin: 30px 0;">
//         <a href="${resetUrl}" style="background-color: #dc3545; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
//           Reset Password
//         </a>
//       </div>
//       <p style="color: #777; font-size: 14px;">
//         Or copy and paste this link into your browser:<br />
//         <a href="${resetUrl}" style="color: #dc3545;">${resetUrl}</a>
//       </p>
//       <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
//       <p style="color: #999; font-size: 12px;">If you didn't request a password reset, you can safely ignore this email.</p>
//     </div>
//   `;

//   return sendEmail({
//     to,
//     subject,
//     text: `Reset your password by visiting: ${resetUrl}`,
//     html,
//   });
// };

export default sendEmail;