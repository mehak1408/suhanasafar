const Booking = require("../models/Booking");

// Book a seat
exports.createBooking = async (req, res) => {
  try {
    const { busId, seatNumber } = req.body;

    if (!busId || !seatNumber) {
      return res.status(400).json({
        message: "Bus ID and seat number are required",
      });
    }

    const existing = await Booking.findOne({
      busId,
      seatNumber,
      status: "booked",
    });

    if (existing) {
      return res.status(400).json({
        message: "Seat already booked",
      });
    }

    const booking = await Booking.create({
      busId,
      seatNumber,
      passengerId: req.user._id,
    });

    const populatedBooking = await Booking.findById(booking._id).populate("busId");

    res.status(201).json({
      message: "Seat booked successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (
      booking.passengerId?.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to cancel this booking",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cancel failed",
      error: error.message,
    });
  }
};

// View bookings
exports.getBookings = async (req, res) => {
  try {
    let bookings;

    if (req.user.role === "admin") {
      bookings = await Booking.find().populate("busId passengerId");
    } else {
      bookings = await Booking.find({
        passengerId: req.user._id,
      }).populate("busId");
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Fetching bookings failed",
      error: error.message,
    });
  }
};

exports.getBookedSeatCount = async (req, res) => {
  try {
    const count = await Booking.countDocuments({
      busId: req.params.busId,
      status: "booked",
    });

    res.json({ bookedSeatsCount: count });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch booked seat count",
      error: error.message,
    });
  }
};