import React, { useState, useRef, useEffect } from "react";
import {chatRoom} from "../../services/chatService"
import "./chatWindow.css";

const ChatWindow = ({ onCloseChat , user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const newMessageObject = { text: newMessage, sender: user.username };

    // Update state using a callback function to avoid potential race conditions
    setMessages((prevMessages) => [...prevMessages, newMessageObject]);

    const res = await chatRoom(newMessage, user);
    console.log(res);
    setNewMessage("");
  };


  useEffect(() => {
    // Scroll to the bottom when a new message is added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return  (
    <div className="chat-window">
      <button className="close-button" onClick={onCloseChat}>
        &times;
      </button>
      <div className="chat-header">{user.username}</div>
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
    </div>)
};

export default ChatWindow;
