const amqplib = require('amqplib');
const { faker } = require("@faker-js/faker");
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

(async () => {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();
  const exchange = "myExchange";
  const queue = "DemoData";
  const routingKey = "DemoData";



  try {
    console.log('Publishing');
    
    await channel.assertExchange(exchange, 'direct', {durable: true});
    await channel.assertQueue(queue, {durable: true});
      await channel.bindQueue(queue, exchange, routingKey);
      

    const data = generateData();
    const message = JSON.stringify(data);
    const timestamp = Date.now();
    const priority = Math.floor(Math.random() * 10) + 1;

    channel.sendToQueue(queue, Buffer.from(message), {
        priority,
        timestamp,
      });

    console.log('Message to the Queue');
  } catch(e) {
    console.error('Error in publishing message', e);
  } finally {
    console.info('Closing channel and connection if available');
    await channel.close();
    await connection.close();
    console.info('Channel and connection closed');
  }
  process.exit(0);
})();


function generateData() {
    return {
      message: faker.lorem.sentence(9),
      timestamp: Date.now(),
      priority: (Math.random() * 10).toFixed(0),
    };
  }