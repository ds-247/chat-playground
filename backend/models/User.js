const Joi = require("joi");
// const jwt = require("jsonwebtoken");
// const secretKey = process.env.SECRET_KEY;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
});

const User = new mongoose.model("User", userSchema);

// async function validateUserId(userId) {
//   const schema = Joi.object({
//     userId: Joi.string()
//       .regex(/^[0-9a-fA-F]{24}$/)
//       .message("Invalid User Id "),
//   });

//   try {
//     await schema.validateAsync({ userId });
//   } catch (error) {
//     return error;
//   }
// }

async function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(50)
      .message("Name is required and must be atleast 3 characters long"),
    username: Joi.string()
      .required()
      .string()
      .message("Username must be unique"),
    password: Joi.string()
      .required()
      .min(5)
      .message("password must be atleast 5 characters")
  });

  try {
    await schema.validateAsync(user);
  } catch (err) {
    return err;
  }
}

async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

async function checkPassword(inputPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

exports.User = User;
// exports.validateUserId = validateUserId;
exports.validateUser = validateUser;
exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;
