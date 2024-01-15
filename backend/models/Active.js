const mongoose = require("mongoose");

const activeUserSchema = new mongoose.Schema({
  activeUsers: [
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
    },
  ],
});

const ActiveUser = new mongoose.model("ActiveUser", activeUserSchema);

exports.ActiveUser = ActiveUser;
