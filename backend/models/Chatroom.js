const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  info: {
    memberOne: {
      username: {
        type: String,
        required: true,
      },
    },
    memberTwo: {
      username: {
        type: String,
        required: true,
      },
    },
  },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
