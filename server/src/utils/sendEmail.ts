import dns from "node:dns";
import nodemailer from "nodemailer";

dns.setDefaultResultOrder("ipv4first");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify connection on startup
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
 * Sends an email verification link to a user after signup.
 */
export const sendVerificationEmail = async (to: string, subject: string, message: string) => {
	transporter.sendMail({
		to: to,
		subject: subject,
		html: message,
	});
	console.log("email is sent");
};

sendVerificationEmail();
export default sendVerificationEmail;