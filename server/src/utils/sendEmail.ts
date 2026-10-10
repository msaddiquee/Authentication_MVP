import "dotenv/config";
import dns from "node:dns";
import nodemailer from "nodemailer";

dns.setDefaultResultOrder("ipv4first");

// Prevent nodemailer from picking unreachable IPv6 addresses on systems without IPv6 routing
dns.resolve6 = ((_hostname: string, callback: (err: Error | null, addresses: string[]) => void) => {
  callback(null, []);
}) as typeof dns.resolve6;

if (dns.Resolver) {
  dns.Resolver.prototype.resolve6 = ((_hostname: string, callback: (err: Error | null, addresses: string[]) => void) => {
    callback(null, []);
  }) as typeof dns.Resolver.prototype.resolve6;
}

const emailUser = process.env.EMAIL_USER;
// Remove any whitespace from Gmail app passwords (Google displays them formatted with spaces like 'xxxx xxxx xxxx xxxx')
const emailPass = process.env.EMAIL_PASSWORD?.replace(/\s+/g, "");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Verify connection on startup
if (emailUser && emailPass) {
  transporter.verify((error) => {
    if (error) {
      console.error("⚠️ Email transporter verification failed:", error);
    } else {
      console.log(`✅ Email service is ready to send messages via ${emailUser}`);
    }
  });
} else {
  console.warn("⚠️ Email credentials missing in environment variables. EMAIL_USER:", emailUser ? "Set" : "Missing", "EMAIL_PASSWORD:", emailPass ? "Set" : "Missing");
}

/**
 * Sends an email verification link to a user after signup.
 */
export const sendVerificationEmail = async (
  to: string,
  verificationUrl: string,
  subject: string = "Verify Your Email Address"
) => {
  const mailOptions = {
    from: `"${process.env.APP_NAME || "Authentication App"}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to,
    subject,
    text: `Please verify your email address by visiting: ${verificationUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333;">Verify Your Email</h2>
        <p style="color: #555; line-height: 1.5;">
          Thank you for signing up! Please click the button below to verify your email address:
        </p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${verificationUrl}" style="background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="color: #777; font-size: 13px;">
          Or copy and paste this link into your browser:<br />
          <a href="${verificationUrl}" style="color: #007bff;">${verificationUrl}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully to:", to);
  return info;
};

export default sendVerificationEmail;