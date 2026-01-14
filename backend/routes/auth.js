const express = require("express");
const { body } = require("express-validator");
const { login, getMe, forgotPassword, resetPassword } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword); // Route for forget password 
router.post("/resetpassword", resetPassword); // Route for reset password 

module.exports = router;
