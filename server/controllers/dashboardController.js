const Bus = require("../models/Bus");
const Booking = require("../models/Booking");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalBuses = await Bus.countDocuments();

    const activeBuses = await Bus.countDocuments({
      currentLocation: { $exists: true },
    });

    const confirmedBookings = await Booking.countDocuments({
      status: "booked",
    });

    const cancelledBookings = await Booking.countDocuments({
      status: "cancelled",
    });

    const totalRequests = await Booking.countDocuments();

    const myConfirmedBookings = await Booking.countDocuments({
      passengerId: req.user._id,
      status: "booked",
    });

    const myCancelledBookings = await Booking.countDocuments({
      passengerId: req.user._id,
      status: "cancelled",
    });

    const myTotalRequests = await Booking.countDocuments({
      passengerId: req.user._id,
    });

    res.json({
      totalBuses,
      activeBuses,
      confirmedBookings,
      cancelledBookings,
      totalRequests,
      myConfirmedBookings,
      myCancelledBookings,
      myTotalRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};