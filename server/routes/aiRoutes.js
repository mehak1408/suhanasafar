const express = require("express");
const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const text = message.toLowerCase().trim();
    let reply =
      "I can help with bus routes, booking guidance, schedules, emergency contacts, and app features.";

    if (
      text.includes("what does this app do") ||
      text.includes("about this app") ||
      text.includes("what this app does")
    ) {
      reply =
        "Suhana Safar is a smart bus transport app with real-time bus tracking, seat booking, schedules, emergency contacts, personal contacts, feedback, and dashboard analytics.";
    } else if (
      text.includes("book") ||
      text.includes("booking") ||
      text.includes("how do i book a seat")
    ) {
      reply =
        "Go to the Bookings page, select a bus, enter a seat number, and click Book. You can also cancel a confirmed booking from the same page.";
    } else if (
      text.includes("schedule") ||
      text.includes("timing") ||
      text.includes("departure")
    ) {
      reply =
        "You can view bus schedules, departure times, arrival times, and routes on the Schedule page.";
    } else if (
      text.includes("bus") ||
      text.includes("route") ||
      text.includes("location") ||
      text.includes("tracking")
    ) {
      reply =
        "Go to the Bus Location page to track active buses on the map, search by route or driver, and view detailed bus information.";
    } else if (
      text.includes("emergency") ||
      text.includes("helpline") ||
      text.includes("police") ||
      text.includes("ambulance") ||
      text.includes("fire")
    ) {
      reply =
        "Emergency services available are: Police 100, Fire 101, Ambulance 108, Women Helpline 1091, and National Emergency 112.";
    } else if (
      text.includes("contact") ||
      text.includes("my contacts")
    ) {
      reply =
        "You can save personal contacts in My Contacts and store urgent numbers in the Emergency Contacts section.";
    } else if (
      text.includes("feedback") ||
      text.includes("suggestion") ||
      text.includes("complaint")
    ) {
      reply =
        "You can share suggestions or issues using the Feedback page.";
    } else if (
      text.includes("login") ||
      text.includes("signup") ||
      text.includes("account")
    ) {
      reply =
        "You can create an account on the Signup page and log in securely to access booking, dashboard, contacts, and feedback features.";
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Chatbot route error:", error.message);
    return res.status(500).json({
      message: "Chatbot response failed",
      error: error.message,
    });
  }
});

module.exports = router;