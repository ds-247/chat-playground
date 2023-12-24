const { User, validateUser, hashPassword } = require("../models/User");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
  const allUsers = await User.find().select("-password -name");
  res.send(allUsers);
});

router.post("/register", async (req, res) => {
  const error = await validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log("request pochi");

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already existed...");

  user = new User(_.pick(req.body, ["name", "password", "username"]));

  // const plaintextPassword = req.body.password;
  try {
    // user.password = await hashPassword(plaintextPassword);
    await user.save();

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["name", "username"]));
  } catch (error) {
    console.log("Error hashing password", error)
    // logger.error("Error hashing password:", error);
    return res.status(500).send("Something Wrong happened Try again");
  }
});

module.exports = router;
