const mqttService = require("../Service/mqttService");

// Change this to point to your MQTT broker
const MQTT_HOST_NAME = "mqtt://broker.hivemq.com";

const mqttClient = new mqttService(MQTT_HOST_NAME);
mqttClient.connect();

exports.publishMQTTMessage = async function (req, res) {
  try {
    const topic = req.body.topicOne; // Assuming the topic is provided in the request body
    const message = req.body.message;

    console.log(`Request Topic :: ${topic}`);
    console.log(`Request Message :: ${message}`);

    mqttClient.publish(topic, message, {});
    res
      .status(200)
      .json({ status: "200", message: "Successfully published MQTT Message" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
