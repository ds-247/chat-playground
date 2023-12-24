const mongoose = require("mongoose");

const onlineUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Index for faster query performance
// onlineUserSchema.index({ userId: 1 });

const OnlineUser = new mongoose.model("OnlineUser", onlineUserSchema);

exports.OnlineUser = OnlineUser;
