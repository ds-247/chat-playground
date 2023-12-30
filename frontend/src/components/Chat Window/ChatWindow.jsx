import React, { useState, useRef, useEffect } from "react";
import { exitChatRoom } from "../../services/chatService";
import TelegramIcon from "@mui/icons-material/Telegram";
import mqtt from "mqtt";
import "./chatWindow.css";

const ChatWindow = ({ onChatClose, user, topics }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const chatMessagesRef = useRef(null);
  const mqttClientRef = useRef(null); // Create a ref to hold the client instance

  useEffect(() => {
    const mqttHost = "wss://broker.hivemq.com:8884/mqtt";
    const username = "YOURUSERNAME";
    const password = "YOURPASS";

    const options = {
      username,
      password,
      clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
    };

    mqttClientRef.current = mqtt.connect(mqttHost, options); // Save the client instance to the ref

    mqttClientRef.current.on("connect", () => {
      mqttClientRef.current.subscribe(topics["subscribeTopic"]);
    });

    mqttClientRef.current.on("message", (topic, payload) => {
      const receivedMessage = payload.toString();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: receivedMessage, sender: "bot" },
      ]);
    });

    mqttClientRef.current.on("error", (err) => {
      console.error("MQTT Error:", err);
    });

    mqttClientRef.current.on("offline", () => {
      // setConnectionStatus("Offline");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      mqttClientRef.current.end();
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    mqttClientRef.current.publish(topics["publishTopic"], newMessage); // Access the client instance from the ref

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, sender: "Sender" },
    ]);
    setNewMessage("");
  };

  const handleCloseChat = async () => {
    try {
      const response = await exitChatRoom();
      if (response.status === 200) {
        mqttClientRef.current.end();
        console.log("mqtt connection terminated...");
        onChatClose();
      } else {
        console.error("Disconnection failed");
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  return (
    <div className="chat-window">
      <button className="close-button" onClick={handleCloseChat}>
        &times;
      </button>
      <div className="chat-header">{user.username}</div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "Sender" ? "user" : "bot"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button id="sendButton" onClick={handleSendMessage}>
          <TelegramIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
