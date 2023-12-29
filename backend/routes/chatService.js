const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, validateUserId } = require("../models/User");
const _ = require("lodash");

router.post("/chatPermissions", [auth], async (req, res) => {
  const userId = req.user._id;
  const participantId = req.body.participantId;

  let ex = await validateUserId(userId);
  if (ex) return res.status(400).json({ error: "Invalid User Id" });

  ex = await validateUserId(participantId);
  if (ex) return res.status(400).json({ error: "Invalid User Id" });

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: "User not found" });

  const participant = await User.findById(participantId);
  if (!participant)
    return res.status(400).json({ error: "Participant not found" });

  const topics = {
    publish: `${userId}-${participantId}`,
    subscribe: `${participantId}-${userId}`,
  };

  res.status(200).json({
    publishTopic: topics.publish,
    subscribeTopic: topics.subscribe,
    message: "Chat topics retrieved successfully",
  });
});

router.get("/chatRoom/close", [auth], async (req, res) => {
  const userId = req.user._id;

  let ex = await validateUserId(userId);
  if (ex) return res.status(400).json({ error: "Invalid User Id" });

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: "User not found" });

  res.status(200).send("Exited..");
});

module.exports = router;
