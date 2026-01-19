const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const sendEmail = require("../utils/sendEmail");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Login user (Admin only)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is an admin
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Forgot Password - Send OTP
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(`-> Forgot Password requested for: ${email}`);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("-> User not found in DB");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP
    user.resetPasswordOtp = otp;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const message = `Your password reset OTP is: ${otp}\n\nThis OTP is valid for 10 minutes.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset OTP",
        message,
      });

      console.log("-> OTP Email sent successfully");
      res.status(200).json({ success: true, message: "OTP sent to email" });
    } catch (error) {
      console.error("-> Email Send Failed. Error:", error.message);
      
      // Reset OTP fields if email fails
      user.resetPasswordOtp = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ 
        success: false, 
        message: "Email could not be sent. Check server logs." 
      });
    }
  } catch (error) {
    console.error("-> Database/Server Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Reset Password via OTP
// @route   POST /api/auth/resetpassword
// @access  Public
const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetPasswordOtp: otp,
      resetPasswordExpire: { $gt: Date.now() }, // Check if not expired
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or OTP expired" });
    }

    // Set new password
    user.password = password;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpire = undefined;
    await user.save(); // Pre-save hook will hash the password

    res.status(200).json({
      success: true,
      message: "Password updated successfully! You can now login.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  login,
  getMe,
  forgotPassword,
  resetPassword,
};
