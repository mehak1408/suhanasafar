const Bus = require("../models/Bus");
const { getIO } = require("../socket");

const routes = {
  "Delhi → Noida": [
    { latitude: 28.5355, longitude: 77.3910 },
    { latitude: 28.5480, longitude: 77.4015 },
    { latitude: 28.5615, longitude: 77.4140 },
    { latitude: 28.5760, longitude: 77.4280 },
    { latitude: 28.5900, longitude: 77.4430 },
  ],

  "Delhi → Ghaziabad": [
    { latitude: 28.6692, longitude: 77.4538 },
    { latitude: 28.6750, longitude: 77.4680 },
    { latitude: 28.6820, longitude: 77.4820 },
    { latitude: 28.6900, longitude: 77.4960 },
    { latitude: 28.6990, longitude: 77.5100 },
  ],

  "Delhi → Gurgaon": [
    { latitude: 28.4595, longitude: 77.0266 },
    { latitude: 28.4680, longitude: 77.0340 },
    { latitude: 28.4765, longitude: 77.0410 },
    { latitude: 28.4850, longitude: 77.0490 },
    { latitude: 28.4940, longitude: 77.0580 },
  ],

  "Delhi → Faridabad": [
    { latitude: 28.4089, longitude: 77.3178 },
    { latitude: 28.4180, longitude: 77.3260 },
    { latitude: 28.4270, longitude: 77.3360 },
    { latitude: 28.4360, longitude: 77.3470 },
    { latitude: 28.4460, longitude: 77.3580 },
  ],
};

const routeIndex = {};

async function startAutoSimulation() {
  console.log("Auto bus simulation started");

  setInterval(async () => {
    try {
      const buses = await Bus.find();

      for (const bus of buses) {
        const route = routes[bus.route];

        if (!route) continue;

        if (routeIndex[bus._id] === undefined) {
          routeIndex[bus._id] = 0;
        }

        routeIndex[bus._id]++;

        if (routeIndex[bus._id] >= route.length) {
          routeIndex[bus._id] = 0;
        }

        bus.currentLocation = route[routeIndex[bus._id]];

        await bus.save();

console.log(
  "Moving",
  bus.busNumber,
  bus.currentLocation.latitude,
  bus.currentLocation.longitude
);

getIO().emit("busLocationUpdate", bus);

console.log("Event emitted");
      }
    } catch (err) {
      console.log(err);
    }
  }, 3000);
}

module.exports = startAutoSimulation;