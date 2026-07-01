const mongoose = require("mongoose");
require("dotenv").config();

const Bus = require("./models/Bus");
const Schedule = require("./models/Schedule");

async function seedSchedules() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const buses = await Bus.find();

    if (!buses.length) {
      console.log("No buses found. Seed buses first.");
      process.exit();
    }

    const scheduleTemplates = [
      { date: "2026-03-10", departureTime: "08:00 AM", arrivalTime: "01:00 PM" },
      { date: "2026-03-10", departureTime: "10:30 AM", arrivalTime: "03:30 PM" },
      { date: "2026-03-11", departureTime: "07:15 AM", arrivalTime: "12:15 PM" },
      { date: "2026-03-11", departureTime: "02:00 PM", arrivalTime: "07:00 PM" },
      { date: "2026-03-12", departureTime: "09:00 AM", arrivalTime: "02:00 PM" },
      { date: "2026-03-12", departureTime: "04:00 PM", arrivalTime: "09:00 PM" },
    ];

    let created = 0;

    for (let i = 0; i < buses.length; i++) {
      const bus = buses[i];
      const template = scheduleTemplates[i % scheduleTemplates.length];

      const exists = await Schedule.findOne({
        busId: bus._id,
        date: new Date(template.date),
        departureTime: template.departureTime,
      });

      if (!exists) {
        await Schedule.create({
          busId: bus._id,
          date: new Date(template.date),
          departureTime: template.departureTime,
          arrivalTime: template.arrivalTime,
        });
        created++;
        console.log(`Created schedule for ${bus.busNumber}`);
      }
    }

    console.log(`Schedule seeding completed. Added ${created} schedules.`);
    process.exit();
  } catch (error) {
    console.error("Schedule seeding error:", error);
    process.exit(1);
  }
}

seedSchedules();