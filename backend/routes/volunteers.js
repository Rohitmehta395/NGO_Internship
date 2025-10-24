const express = require("express");
const { body } = require("express-validator");
const {
  submitApplication,
  getApplications,
  updateStatus,
} = require("../controllers/volunteerController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Please enter a valid email"),
      body("phone").notEmpty().withMessage("Phone number is required"),
      body("experience").notEmpty().withMessage("Experience is required"),
      body("availability").notEmpty().withMessage("Availability is required"),
      body("motivation").notEmpty().withMessage("Motivation is required"),
    ],
    submitApplication
  )
  .get(protect, authorize("admin"), getApplications);

router.put("/:id/status", protect, authorize("admin"), updateStatus);

module.exports = router;
