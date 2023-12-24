const users = require("../routes/users");
const ChatService = require('../routes/chatService');


module.exports = function (app) {
  app.use("/users", users);
  app.use("/chat", ChatService);
};
