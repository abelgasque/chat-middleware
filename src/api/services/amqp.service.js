import amqp from 'amqplib';
import "dotenv/config";

class AmqpService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    if (this.connection && this.channel) return;

    this.connection = await amqp.connect({
      protocol: 'amqp',
      hostname: process.env.RABBITMQ_HOST,
      port: parseInt(process.env.RABBITMQ_PORT),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      vhost: process.env.RABBITMQ_VHOST
    });

    this.channel = await this.connection.createChannel();
  }

  async publishToExchange(exchange, routingKey, message) {
    await this.connect();

    await this.channel.assertExchange(exchange, 'fanout', { durable: false });
    this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    console.log(`📤 Publicado na exchange "${exchange}" com routingKey "${routingKey}":`, message);
  }

  async consumeFromExchange(exchange, onMessage) {
    await this.connect();

    await this.channel.assertExchange(exchange, 'fanout', { durable: false });

    const q = await this.channel.assertQueue('', { exclusive: true });
    await this.channel.bindQueue(q.queue, exchange, '');

    this.channel.consume(q.queue, (msg) => {
      if (msg.content) {
        const message = JSON.parse(msg.content.toString());
        console.log(`📥 Evento recebido da exchange "${exchange}":`, message);
        onMessage(message);
      }
    }, { noAck: true });
  }
}

export default AmqpService;