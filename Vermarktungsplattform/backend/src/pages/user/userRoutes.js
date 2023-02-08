const express = require("express");

const router = express.Router();


/**
 * User router
 */
const { signupUser, loginUser, getMe } = require("./userController");
const { protect } = require("../../middleware/authMiddleware");

router.post("/", signupUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
