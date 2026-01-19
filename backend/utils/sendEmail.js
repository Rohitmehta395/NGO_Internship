require("dotenv").config();
const nodemailer = require("nodemailer");
const dns = require("node:dns");

// --- CRITICAL FIX: Force Node.js to use IPv4 ---
// Render often fails to connect to Gmail via IPv6, causing the Timeout.
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
  }
} catch (e) {
  console.log("Could not set IPv4 preference");
}

const sendEmail = async (options) => {
  // Use port 465 (SSL) by default as it is more reliable on cloud servers
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
        // Force SSLv3 to prevent handshake hangs
        ciphers: "SSLv3",
      },
      // Increase timeout
      connectionTimeout: 30000,
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
