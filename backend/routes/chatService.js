const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const publisherController = require("../Controller/publisher");
const { User, validateUserId } = require("../models/User");
const { OnlineUser } = require("../models/OnlineUsers");
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

    const activeBefore = await OnlineUser.findById(userId);
    if (activeBefore) {
      console.log("got it ", userId)
      const newOnlineUser = new OnlineUser({
        userId: userId,
      });
      await newOnlineUser.save();
    }
    

    const isParticipantActive = await OnlineUser.findById(receiverId);
    // if (!isParticipantActive) {
    //   await OnlineUser.deleteOne({userId: userId});
    //   return res.status(200).send("Offline");
    // }

    console.log("check");
    res
      .status(200)
      .header("chat-room", "Allowed")
      .header("access-control-expose-headers", "chat-room")
      .send("User is Online");
  }
});

router.get('/chatRoom/close', [auth] , async (req, res)=>{
  const userId = req.user._id;

    let ex = await validateUserId(userId);
    if (ex) return res.status(400).send("Invalid User Id");

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("Requestee not found ...");

    const participant = await User.findById(userId);
    if (!participant) return res.status(404).send("Participant not found ....");

    await OnlineUser.deleteOne({ userId: userId });

    res.status(200).send("Exited..");
})

router.post("/chatRoom", [auth], async (req, res) => {
  try {
    const userId = req.user._id;
    const receiverId = req.body.receiverId;
    // const topicOne = `${userId}-${receiverId}`;
    const topicOne = "yelo"
    // const topicTwo = `${receiverId}-${userId}`;

    req.body.topicOne = topicOne;
    

    // Call the subscribeMQTTTopic function for the first topic
    publisherController.publishMQTTMessage(req, res);

    // Call the subscribeMQTTTopic function for the second topic
    // await mqttController.subscribeMQTTTopic(req, res, topicTwo);
  } catch (error) {
    // Handle errors
    console.error("Error in chatRoom/subscribe endpoint:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = router;
