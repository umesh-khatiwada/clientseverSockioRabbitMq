const amqplib = require("amqplib");
const { faker } = require("@faker-js/faker");
const amqpUrl = process.env.AMQP_URL || "amqp://localhost:5673";

// accept the 20 message for sec
const MESSAGE_RATE_PER_SECOND = 20;

(async () => {
  //connect the message queing service( RabbbitMq )
  const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  const xchange = "myExchange";
  const que = "DemoData";
  const routingKey = "DemoData";
  try {
    console.log("Publishing");

    await channel.assertExchange(xchange, "direct", { durable: true });
    await channel.assertQueue(que, { durable: true });
    await channel.bindQueue(que, xchange, routingKey);

    let i = 0;
    while (i < MESSAGE_RATE_PER_SECOND) {
      const data = generateData();
      const message = JSON.stringify(data);
      const timestamp = Date.now();
      const priority = Math.floor(Math.random() * 10) + 1;

      channel.sendToQueue(queue, Buffer.from(message), {
        priority,
        timestamp,
      });

      console.log("Message to the Queue");

      i++;
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 / MESSAGE_RATE_PER_SECOND)
      );
    }
  } catch (e) {
    console.error("Error in publishing message", e);
  } finally {
    console.info("Closing channel and connection if available");
    await channel.close();
    await connection.close();
    console.info("Channel and connection closed");
  }
  process.exit(0);
})();

//Generate the fake data ("feed the data ")
function generateData() {
  return {
    message: faker.lorem.sentence(9),
    timestamp: Date.now(),
    priority: (Math.random() * 10).toFixed(0),
  };
}
