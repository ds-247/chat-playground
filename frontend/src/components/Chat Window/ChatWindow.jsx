// ChatWindow.js

import React, { useState, useRef, useEffect } from "react";
import "./chatWindow.css";

const ChatWindow = ({ onCloseChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(true);

  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage("");
  };

  // const handleCloseChat = () => {
  //   setIsChatOpen(false);
  // };

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return isChatOpen ? (
    <div className="chat-window">
      <button className="close-button" onClick={onCloseChat}>
        &times;
      </button>
      <div className="chat-header">Vibrant Chat</div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  ) : null;
};

export default ChatWindow;
