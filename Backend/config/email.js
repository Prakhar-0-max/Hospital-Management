import nodemailer from "nodemailer";

let transporter = null;

export function getTransporter() {
  if (!transporter) {
    console.log("🔍 Creating transporter...");
    console.log("EMAIL_USER in email.js:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists in email.js?", !!process.env.EMAIL_PASS);

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}
