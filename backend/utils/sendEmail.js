require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587, // Hardcoded to 587 as requested
    secure: false, // 587 is STARTTLS (not SSL), so secure is false
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000, // 10 seconds to establish connection
    greetingTimeout: 10000, // 10 seconds to wait for server greeting
    socketTimeout: 10000, // 10 seconds of inactivity before closing
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Verify connection (Optional but good for debugging)
  try {
    await transporter.verify();
    console.log("SMTP Connection verified");
  } catch (error) {
    console.error("SMTP Connection Failed:", error);
    throw error;
  }

  await transporter.sendMail(message);
};

module.exports = sendEmail;
