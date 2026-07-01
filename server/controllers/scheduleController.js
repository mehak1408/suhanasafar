const Schedule = require("../models/Schedule");

// Add schedule (admin only)
exports.addSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json({ message: "Schedule added", schedule });
  } catch (err) {
    res.status(500).json({ message: "Failed to add schedule", error: err.message });
  }
};

// Get schedules
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("busId");
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch schedules", error: err.message });
  }
};