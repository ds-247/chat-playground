const mqtt = require("mqtt");
const protocol = "ws";
const host = "broker.emqx.io";
const port = "8083";
const path = "/mqtt";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `${protocol}://${host}:${port}${path}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
});

client.on("connect", () => {
  console.log("Connected");
});
