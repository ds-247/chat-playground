const users = require("../routes/users");
const chatService = require("../routes/chatService");
const auth =  require("../routes/auth");

module.exports = function (app) {
  app.use("/users", users);
  app.use("/chat", chatService);
  app.use("/login", auth);
};
