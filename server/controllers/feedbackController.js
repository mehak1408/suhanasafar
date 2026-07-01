const Feedback = require("../models/Feedback");

// Submit feedback (any user or guest)
exports.submitFeedback = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Feedback message is required" });
    }

    const feedback = await Feedback.create({ userId, message });
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit feedback", error: error.message });
  }
};

// Get all feedback (admin only)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "name email");
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback", error: error.message });
  }
};

// Delete feedback (admin only)
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete feedback", error: error.message });
  }
};