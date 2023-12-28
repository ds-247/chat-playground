import mqtt from "mqtt";

const mqttHost = "wss://broker.hivemq.com:8884/mqtt";
const username = "YOURUSERNAME";
const password = "YOURPASS";

const options = {
  username,
  password,
  clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
};

let client = null;

export function startConnection() {
  client = mqtt.connect(mqttHost, options);
  console.log("Connecting to the MQTT service...");

  client.on("connect", function () {
    console.log("Connected to the MQTT service");
  });

  client.on("message", function (topic, message) {
    console.log(
      "Received message -> ",
      message.toString(),
      "topic is ->",
      topic
    );
    // Handle the incoming message, update state, etc.
  });
}

export function subscribeToTopic(topic) {
  client.subscribe(topic, function (err) {
    if (!err) {
      console.log(`Subscribed to ${topic}`);
    }
  });
}

export function publishToTopic(topic, message) {
  client.publish(topic, message);
}

export function endConnection() {
  client.end();
}
