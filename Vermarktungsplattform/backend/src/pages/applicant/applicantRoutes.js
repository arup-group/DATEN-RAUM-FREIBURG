const express = require("express");
const { protect } = require("../../middleware/authMiddleware");

const router = express.Router();

/**
 * Applicant router
 */
const {
  getAllApplicants,
  getApplicant,
} = require("../applicant/applicantController");

router.route("/").get(protect, getAllApplicants);
router.route("/:id").get(protect, getApplicant);

module.exports = router;
