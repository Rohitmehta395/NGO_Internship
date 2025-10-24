const Volunteer = require("../models/Volunteer");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

// Email transporter - CORRECTED
const transporter = nodemailer.createTransport({
  // Changed from createTransporter to createTransport
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc    Submit volunteer application
// @route   POST /api/volunteers
// @access  Public
const submitApplication = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errors.array(),
      });
    }

    const volunteer = await Volunteer.create(req.body);

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: volunteer.email,
      subject: "Volunteer Application Received",
      html: `
        <h2>Thank you for your interest in volunteering!</h2>
        <p>Dear ${volunteer.name},</p>
        <p>We have received your volunteer application and will review it shortly.</p>
        <p>We will contact you within 3-5 business days.</p>
        <p>Best regards,<br>The Education Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get all volunteer applications
// @route   GET /api/volunteers
// @access  Private/Admin
const getApplications = async (req, res) => {
  try {
    const { status, limit } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    let applications = Volunteer.find(query);

    if (limit) {
      applications = applications.limit(parseInt(limit));
    }

    const result = await applications.sort({ createdAt: -1 });

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Update application status
// @route   PUT /api/volunteers/:id/status
// @access  Private/Admin
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Send status update email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: volunteer.email,
      subject: `Volunteer Application ${
        status.charAt(0).toUpperCase() + status.slice(1)
      }`,
      html: `
        <h2>Application Status Update</h2>
        <p>Dear ${volunteer.name},</p>
        <p>Your volunteer application has been <strong>${status}</strong>.</p>
        ${
          status === "approved"
            ? "<p>Welcome to our team! We will contact you soon with next steps.</p>"
            : ""
        }
        <p>Best regards,<br>The Education Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Status updated successfully",
      data: volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  updateStatus,
};
