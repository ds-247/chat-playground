const Joi = require("joi");
const { User, checkPassword } = require("../models/User");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  const error = await validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password...");

  const inputPassword = req.body.password;
  const storedHashedPassword = user.password;

  checkPassword(inputPassword, storedHashedPassword)
    .then((isMatch) => {
      if (isMatch) {
        const token = user.generateAuthToken();
        res.send({ token });
      } else {
        return res.status(400).send("Invalid user name or password...");
      }
    })
    .catch((error) => {
      console.log("Error checking password:", error);
    });
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
