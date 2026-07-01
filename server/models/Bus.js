const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    currentLocation: {
      latitude: Number,
      longitude: Number,
    },
    fare: {
      type: Number,
      required: true,
      default: 20, // default fare
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Bus", busSchema);
