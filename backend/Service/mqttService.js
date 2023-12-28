const mqtt = require("mqtt");

class MQTTService {
  constructor(host, messageCallback) {
    this.mqttClient = null;
    this.host = host;
    this.messageCallback = messageCallback;
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host);

    // MQTT Callback for 'error' event
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // MQTT Callback for 'connect' event
    this.mqttClient.on("connect", () => {
      console.log(`MQTT client connected`);
    });

    // Call the message callback function when message arrived
    // this.mqttClient.on("message", function (topic, message) {
    //   console.log(message.toString());
    //   if (this.messageCallback) this.messageCallback(topic, message);
    // });

     this.mqttClient.on("message", (topic, message) => {
       console.log(message.toString());
       // Call the external messageCallback function when message arrived
       if (this.messageCallback) this.messageCallback(topic, message);
     });

    this.mqttClient.on("close", () => {
      console.log(`MQTT client disconnected`);
    });
  }

  // Publish MQTT Message
  publish(topic, message, options) {
    this.mqttClient.publish(topic, message);
  }

  // Subscribe to MQTT Message
  // subscribe(topic, message) {
  //   this.mqttClient.subscribe(topic, message);
  // }

  subscribe(topic) {
    this.mqttClient.subscribe(topic);
  }
}

module.exports = MQTTService;
