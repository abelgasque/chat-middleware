import "dotenv/config";
import amqp from 'amqplib';
import UserService from "../api/services/user.service.js";

const userService = new UserService();
const {
    RABBITMQ_ENABLE,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_USER,
    RABBITMQ_PASSWORD,
    RABBITMQ_VHOST
} = process.env;

const connectToAmqp = async () => {
    const enableRabbitMQ = RABBITMQ_ENABLE?.toLowerCase() === 'true';

    if (!enableRabbitMQ) {
        console.log('✅ Conexão com o RabbitMQ desabilitada.');
        return;
    }

    try {
        const connection = await amqp.connect({
            protocol: 'amqp',
            hostname: RABBITMQ_HOST,
            port: parseInt(RABBITMQ_PORT),
            username: RABBITMQ_USER,
            password: RABBITMQ_PASSWORD,
            vhost: RABBITMQ_VHOST
        });

        const channel = await connection.createChannel();

        const exchange = 'user.events';
        await channel.assertExchange(exchange, 'fanout', { durable: false });

        const { queue } = await channel.assertQueue('', { exclusive: true });
        await channel.bindQueue(queue, exchange, '');

        channel.prefetch(1);

        console.log('[Consumer] Aguardando mensagens da exchange...');

        const handlers = {
            'user.created': async (payload) => {
                console.log('📩 Criar usuário com payload:', payload);
                await userService.create(payload);
            },
            'user.updated': async (payload) => {
                console.log('✏️ Atualizar usuário com payload:', payload);
                await userService.update(payload.id, payload.body);
            },
            'user.deleted': async (payload) => {
                console.log('🗑️ Excluir usuário com id:', payload.id);
                await userService.delete(payload.id);
            }
        };

        channel.consume(queue, async (msg) => {
            try {
                const { type, payload } = JSON.parse(msg.content.toString());
                const handler = handlers[type];

                console.log('handler:', handler);
                if (handler) {
                    await handler(payload);
                }

                channel.ack(msg);
            } catch (err) {
                console.error('❌ Erro ao processar mensagem:', err);
                channel.nack(msg);
            }
        });

        console.log('✅ Conexão com o RabbitMQ estabelecida com sucesso.');
    } catch (error) {
        console.error("❌ Erro ao conectar no RabbitMQ:", error);
    }
};

export default connectToAmqp;