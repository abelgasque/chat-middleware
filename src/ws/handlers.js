import url from 'url';

import AmqpService from "../api/services/amqp.service.js";

const amqpService = new AmqpService();

export const userConnections = new Map();

export async function handleConnection(ws, req) {
  const params = new URLSearchParams(url.parse(req.url).query);
  const userId = params.get('userId');

  if (!userId) {
    ws.send('❌ Conexão recusada: usuário não identificado.');
    ws.close();
    return;
  }

  await amqpService.connect();
  userConnections.set(userId, ws);
  console.log(`✅ Usuário ${userId} conectado`);

  ws.send('👋 Conexão WebSocket autenticada com sucesso!');

  ws.on('message', async (payload) => {
    console.log(`Mensagem recebida de ${userId}: ${payload}`);
    try {
      const data = JSON.parse(payload);
      await amqpService.publishToExchange('events', 'user.message', {
        type: 'user.message',
        payload: data
      });
    } catch (err) {
      console.error('Erro ao processar mensagem:', err);
      ws.send('❌ Erro ao processar mensagem');
    }
  });

  ws.on('close', () => {
    console.log(`❌ Usuário ${userId} desconectado`);
    userConnections.delete(userId);
  });
}