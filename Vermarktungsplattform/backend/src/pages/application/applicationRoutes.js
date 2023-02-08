const express = require("express");
const { protect } = require("../../middleware/authMiddleware");

const multer = require("multer");
const upload = multer();

const router = express.Router();

/**
 * Application router
 */
const {
    getApplication,
    getAllApplications,
    getApplicationByGrund,
    submitApplication,
    deleteApplication,
    updateApplication,
    // attachments
    uploadApplicationFile,
    downloadApplicationFile,
    deleteApplicationFile,
    getApplicationFiles,
} = require("./applicationController");

router.route("/:id").get(protect, getApplication).put(protect, updateApplication).delete(protect,deleteApplication);
router.route("/create").post(protect, submitApplication);
router.route("/").get(protect, getAllApplications);
router.route("/grund/:id").get(protect, getApplicationByGrund);

// attachments routes
router.route("/attachment/:id").post(protect, upload.any(), uploadApplicationFile);
router.route("/attachment/:aid").get(protect, downloadApplicationFile).delete(protect, deleteApplicationFile);
router.route("/attachment/all/:id").get(protect, getApplicationFiles);

module.exports = router;
