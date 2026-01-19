require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const smtpPort = process.env.SMTP_PORT || 465;

  console.log(`-> Attempting to send email to: ${options.email}`);
  console.log(`-> SMTP Host: ${process.env.SMTP_HOST}`);
  console.log(`-> SMTP Port: ${smtpPort}`);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      secure: smtpPort == 465,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        // Helps prevent handshake errors on some networks
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
    });

    // Verify connection before sending
    await transporter.verify();
    console.log("-> SMTP Connection Verified");

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
