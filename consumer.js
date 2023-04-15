const socketio = require("socket.io");
const amqplib = require("amqplib");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const amqpUrl = process.env.AMQP_URL || "amqp://localhost:5672";
const SOCKET_URL = "http://localhost:3002";

server.listen(3002, () => {
  console.log("Server Started 3002");
});

(async () => {
  const socket = socketio(server, {
    cors: SOCKET_URL,
  });

  //heartbeat=60 mean it will check the on ever  60 sec connection is still live or not ..
  const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  channel.prefetch(10);
  const queue = "DemoData";
  process.once("SIGINT", async () => {
    console.log("got sigint, closing connection");
    await channel.close();
    await connection.close();
    process.exit(0);
  });
  await channel.assertQueue(queue, { durable: true });
  await channel.consume(
    queue,
    async (msg) => {
      const data = JSON.parse(msg.content.toString());
      console.log("data", data);
      console.log("others", data?.priority);
      if (data?.priority >= 7) {
        console.log("Received message:", data);
        // Delay for 50 milliseconds (20 messages per second)
        await new Promise((resolve) => setTimeout(resolve, 50));
        await channel.ack(msg);
        // Emit the message to socket.io
        socket.emit("message", data);
      }
    },
    {
      noAck: false,
      consumerTag: "consumer",
    }
  );
  console.log(" [*] Waiting for messages. To exit press CTRL+C");
})();
