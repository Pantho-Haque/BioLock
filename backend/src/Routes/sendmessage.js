const express = require("express");
const router = express.Router();
const History = require("../Models/history");
const SerialOutput = require("../Models/serialoutput");
const twilio = require("twilio");
const config = require("../Config/message");

// send message to specified number using twilio
router.post("/sendmessage", async (req, res) => {
  const { number, message } = req.body;
  const client = twilio(config.accountSid, config.authToken);

  try {
    // create message
    const twilioMessage = await client.messages.create({
      to: number,
      from: config.twilioNumber,
      body: message,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
