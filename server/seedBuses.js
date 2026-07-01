const mongoose = require("mongoose");
require("dotenv").config();

const Bus = require("./models/Bus");

const buses = [
  {
    busNumber: "DL02CD5678",
    driverName: "Rohit Kumar",
    capacity: 45,
    route: "Delhi → Noida",
    fare: 15,
    currentLocation: {
      latitude: 28.5355,
      longitude: 77.3910,
    },
  },
  {
    busNumber: "DL03EF9012",
    driverName: "Suresh Yadav",
    capacity: 50,
    route: "Delhi → Ghaziabad",
    fare: 18,
    currentLocation: {
      latitude: 28.6692,
      longitude: 77.4538,
    },
  },
  {
    busNumber: "DL04GH3456",
    driverName: "Manoj Verma",
    capacity: 35,
    route: "Delhi → Gurgaon",
    fare: 22,
    currentLocation: {
      latitude: 28.4595,
      longitude: 77.0266,
    },
  },
  {
    busNumber: "DL05IJ7890",
    driverName: "Deepak Sharma",
    capacity: 42,
    route: "Delhi → Faridabad",
    fare: 17,
    currentLocation: {
      latitude: 28.4089,
      longitude: 77.3178,
    },
  },
];

async function seedBuses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    for (const bus of buses) {
      const exists = await Bus.findOne({ busNumber: bus.busNumber });
      if (!exists) {
        await Bus.create(bus);
        console.log(`Inserted ${bus.busNumber}`);
      }
    }

    console.log("Bus seeding completed");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedBuses();