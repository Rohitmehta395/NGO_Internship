const express = require("express");
const { body } = require("express-validator");
const {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/programController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(getPrograms)
  .post(
    protect,
    authorize("admin"),
    [
      body("title").notEmpty().withMessage("Title is required"),
      body("description").notEmpty().withMessage("Description is required"),
      body("category").notEmpty().withMessage("Category is required"),
      body("icon").notEmpty().withMessage("Icon is required"),
      body("duration").notEmpty().withMessage("Duration is required"),
    ],
    createProgram
  );

router
  .route("/:id")
  .get(getProgram)
  .put(protect, authorize("admin"), updateProgram)
  .delete(protect, authorize("admin"), deleteProgram);

module.exports = router;
