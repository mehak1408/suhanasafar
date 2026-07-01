const EmergencyContact = require("../models/EmergencyContact");

// Add emergency contact
exports.addContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json({ message: "Contact added", contact });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add contact", error: err.message });
  }
};

// Get all contacts for user
exports.getContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ userId: req.user._id });
    res.json(contacts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch contacts", error: err.message });
  }
};

// Update contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true },
    );
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact updated", contact });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update contact", error: err.message });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete contact", error: err.message });
  }
};
