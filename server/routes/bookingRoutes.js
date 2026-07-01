const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createBooking,
  cancelBooking,
  getBookings,
  getBookedSeatCount,
} = require("../controllers/bookingController");

router.use(protect);

router.get("/", getBookings);
router.get("/bus/:busId/count", getBookedSeatCount);
router.post("/", createBooking);
router.put("/cancel/:id", cancelBooking);

module.exports = router;