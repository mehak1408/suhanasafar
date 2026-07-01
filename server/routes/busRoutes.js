const express = require("express");
const router = express.Router();

const {
  createBus,
  getAllBuses,
  getBusById,
  deleteBus,
  updateBusLocation,
} = require("../controllers/busController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, adminOnly, createBus);
router.get("/", getAllBuses);
router.get("/:id", getBusById);
router.delete("/:id", protect, adminOnly, deleteBus);
router.put("/:id/location", updateBusLocation);

module.exports = router;