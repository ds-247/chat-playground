const Joi = require("joi");
const { User, checkPassword } = require("../models/User");
const { ActiveUser } = require("../models/Active");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const _ = require("lodash");

router.post("/login", async (req, res) => {
  const error = await validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password...");

  const inputPassword = req.body.password;
  const storedHashedPassword = user.password;

  try {
    const activeUserDoc = await ActiveUser.findOne({});

    if (!activeUserDoc) {
      // If no active users document exists, create a new one
      const newActiveUserDoc = new ActiveUser({
        activeUsers: [{ username: req.body.username }],
      });
      await newActiveUserDoc.save();
    } else {
      // If the document already exists, check if the username is already in the array
      if (
        !activeUserDoc.activeUsers.some((u) => u.username === req.body.username)
      ) {
        // If not, push the new username into the array
        activeUserDoc.activeUsers.push({ username: req.body.username });
        await activeUserDoc.save();
      }
    }

    const isMatch = await checkPassword(inputPassword, storedHashedPassword);

    if (isMatch) {
      const token = user.generateAuthToken();
      return res.send({ token });
    } else {
      return res.status(400).send("Invalid username or password...");
    }
  } catch (error) {
    console.error("Error in the post endpoint:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/logout", [auth], async (req, res) => {
  try {
    const activeUserDoc = await ActiveUser.findOne({});

    if (activeUserDoc) {
      // Filter out the username to be logged out
      activeUserDoc.activeUsers = activeUserDoc.activeUsers.filter(
        (user) => user.username !== req.user.username
      );

      await activeUserDoc.save();
    }

    res.status(200).send("Logged Out");
  } catch (error) {
    console.error("Error while deleting active user:", error);
    res.status(500).send("Can't log out");
  }
});

async function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  });

  try {
    await schema.validateAsync(user, { abortEarly: false });
  } catch (err) {
    return err;
  }
}

module.exports = router;
