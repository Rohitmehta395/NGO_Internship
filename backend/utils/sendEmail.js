require("dotenv").config();
const nodemailer = require("nodemailer");
const dns = require("node:dns");

// CRITICAL FIX: Force IPv4.
// Render/Gmail often hang on IPv6 connections, causing ETIMEDOUT.
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
  }
} catch (e) {
  console.log("Could not set IPv4 preference (Node version too old?)");
}

const sendEmail = async (options) => {
  const smtpPort = process.env.SMTP_PORT || 465;

  console.log(`-> Attempting to send email to: ${options.email}`);
  console.log(`-> SMTP Host: ${process.env.SMTP_HOST}`);
  console.log(`-> SMTP Port: ${smtpPort}`);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      // secure: true for 465, false for other ports
      secure: parseInt(smtpPort) === 465,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
        // Force a specific SSL method to avoid handshake hangs
        ciphers: "SSLv3",
      },
      // Increase timeout to 30 seconds
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    // Verify connection before sending
    await transporter.verify();
    console.log("-> SMTP Connection Verified Successfully");

    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const info = await transporter.sendMail(message);
    console.log("-> Email sent successfully: %s", info.messageId);
  } catch (error) {
    console.error("-> NODEMAILER ERROR:", error);
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
