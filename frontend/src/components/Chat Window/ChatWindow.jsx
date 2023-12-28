import React, { useState, useRef, useEffect } from "react";
import mqtt from "mqtt"
import "./chatWindow.css";

const ChatWindow = ({ onCloseChat, user }) => {
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
      console.log("Connected to MQTT broker");
      mqttClientRef.current.subscribe("melo");
    });

    mqttClientRef.current.on("message", (topic, payload) => {
      const receivedMessage = payload.toString();
      console.log(
        `Received message -> ${receivedMessage}, topic is -> ${topic}`
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: receivedMessage, sender: "bot" },
      ]);
    });

    mqttClientRef.current.on("error", (err) => {
      // setConnectionStatus("Connection failed");
      console.error("MQTT Error:", err);
    });

    mqttClientRef.current.on("offline", () => {
      // setConnectionStatus("Offline");
    });

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

    console.log(newMessage);

    mqttClientRef.current.publish("yelo", newMessage); // Access the client instance from the ref

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, sender: "User Name" },
    ]);
    setNewMessage("");
  };

  return (
    <div className="chat-window">
      <button className="close-button" onClick={onCloseChat}>
        &times;
      </button>
      <div className="chat-header">{user.username}</div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            // className={`message ${
            //   message.sender === user.username ? "user" : "bot"
            // }`}
            className={`message ${
              message.sender === "User Name" ? "user" : "bot"
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
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
