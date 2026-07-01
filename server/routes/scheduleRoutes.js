const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { addSchedule, getSchedules } = require("../controllers/scheduleController");


router.post("/", protect,adminOnly, addSchedule);
router.get("/", getSchedules);

module.exports = router;