require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log("-> Attempting to send email...");
  console.log(`-> SMTP Host: ${process.env.SMTP_HOST || "smtp.gmail.com"}`);
  console.log(`-> SMTP User: ${process.env.SMTP_EMAIL}`);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000, // 10 seconds timeout
    });

    // Verify connection config
    await transporter.verify();
    console.log("-> SMTP Connection Verified Successfully");

    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const info = await transporter.sendMail(message);
    console.log("-> Email sent: %s", info.messageId);
  } catch (error) {
    console.error("-> NODEMAILER ERROR:", error);
    throw error; // Re-throw so controller catches it
  }
};

module.exports = sendEmail;
