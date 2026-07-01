const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  submitFeedback,
  getAllFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

// Any logged-in user can submit feedback
router.post("/", protect, submitFeedback);

// Admin routes
router.get("/", protect, adminOnly, getAllFeedback);
router.delete("/:id", protect, adminOnly, deleteFeedback);

module.exports = router;