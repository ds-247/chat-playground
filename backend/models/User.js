const Joi = require("joi");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
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

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    secretKey
  );
  return token;
};

const User = new mongoose.model("User", userSchema);

async function validateUserId(userId) {
  const schema = Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid User Id "),
  });

  try {
    await schema.validateAsync({ userId });
  } catch (error) {
    return error;
  }
}

async function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50).messages({
      "string.base": "Name must be a string",
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least {#limit} characters long",
      "string.max": "Name cannot be longer than {#limit} characters",
    }),

    username: Joi.string().required().messages({
      "string.base": "Username must be a string",
      "any.required": "Username is required",
      "string.empty": "Username cannot be empty",
    }),

    password: Joi.string().required().min(5).messages({
      "string.base": "Password must be a string",
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least {#limit} characters long",
    }),
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
exports.validateUserId = validateUserId;
exports.validateUser = validateUser;
exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;
