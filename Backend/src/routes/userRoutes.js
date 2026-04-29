const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// Only admins can see all users
router.get("/", protect, admin, getAllUsers);

module.exports = router;
