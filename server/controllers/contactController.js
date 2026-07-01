const Contact = require("../models/Contact");

// Add a new contact
exports.addContact = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const contact = await Contact.create({
      userId: req.user._id,
      name,
      phone,
      email,
    });

    res.status(201).json({ message: "Contact added", contact });
  } catch (err) {
    res.status(500).json({ message: "Failed to add contact", error: err.message });
  }
};

// Get all contacts of logged-in user
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts", error: err.message });
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact updated", contact });
  } catch (err) {
    res.status(500).json({ message: "Failed to update contact", error: err.message });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete contact", error: err.message });
  }
};