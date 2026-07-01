const express = require("express");
const router = express.Router();
const protect  = require("../middleware/authMiddleware");
const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.use(protect);

router.post("/", addContact);
router.get("/", getContacts);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;