const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, validateUserId } = require("../models/User");
const _ = require("lodash");

router.post("/chatPermissions", [auth], async (req, res) => {
  if (req.headers["chat-room"]) {
    res.status(200).send("Good to go for chat");
  } else {
    const userId = req.user._id;
    const receiverId = req.body.receiverId;

    let ex = await validateUserId(userId);
    if (ex) return res.status(400).send("Invalid User Id");

    ex = await validateUserId(receiverId);
    if (ex) return res.status(400).send("Invalid User Id");

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("Requestee not found ...");

    const participant = await User.findById(receiverId);
    if (!participant) return res.status(404).send("Participant not found ....");

    res
      .status(200)
      .header("chat-room", "Allowed")
      .header("access-control-expose-headers", "chat-room")
      .send("User is Online");
  }
});

router.get("/chatRoom/close", [auth], async (req, res) => {
  const userId = req.user._id;

  let ex = await validateUserId(userId);
  if (ex) return res.status(400).send("Invalid User Id");

  const user = await User.findById(userId);
  if (!user) return res.status(404).send("Requestee not found ...");

  const participant = await User.findById(userId);
  if (!participant) return res.status(404).send("Participant not found ....");

  res.status(200).send("Exited..");
});

module.exports = router;
