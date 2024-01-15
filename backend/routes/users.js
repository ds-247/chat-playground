const { User, validateUser, hashPassword } = require("../models/User");
const auth = require("../middleware/auth")
const express = require("express");
const router = express.Router();
const {ActiveUser} = require('../models/Active')
const _ = require("lodash");

router.get("/", [auth], async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all users from the User collection, excluding the current user
    const allUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password -name"
    );

    // Get active users from the ActiveUser collection
    const activeUsers = await ActiveUser.find({}, { _id: 0, activeUsers: 1 });
    const activeUsernames =
      activeUsers.length > 0
        ? activeUsers[0].activeUsers.map((user) => user.username)
        : [];

    // Add an "isActive" field to each user indicating whether they are online or not
    const usersWithStatus = allUsers.map((user) => ({
      ...user.toObject(),
      isActive: activeUsernames.includes(user.username),
    }));

    res.send(usersWithStatus);
  } catch (error) {
    console.error("Error in the get endpoint:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/register", async (req, res) => {
  const error = await validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already existed...");
  
  user = new User(_.pick(req.body, ["name", "password", "username"]));

  const isAlreadyActive = await ActiveUser.findOne({ username: req.body.username });
  if (!isAlreadyActive) {
    const active_user = new ActiveUser({
      username: req.body.username,
    });
    await active_user.save();
  }

  const plaintextPassword = req.body.password;
  try {
    user.password  = await hashPassword(plaintextPassword);
    await user.save();

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["name", "username"]));
  } catch (error) {
    console.log("Error hashing password", error);
    return res.status(500).send("Something Wrong happened Try again");
  }
});

module.exports = router;
