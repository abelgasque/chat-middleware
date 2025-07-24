import url from 'url';
 
const userConnections = new Map();

export function handleConnection(ws, req) {
  const params = new URLSearchParams(url.parse(req.url).query);
  const userId = params.get('userId');

  if (!userId) {
    ws.send('❌ Conexão recusada: usuário não identificado.');
    ws.close();
    return;
  }

  userConnections.set(userId, ws);
  console.log(`✅ Usuário ${userId} conectado`);

  ws.send('👋 Conexão WebSocket autenticada com sucesso!');

  ws.on('message', (payload) => {
    console.log(`Mensagem recebida de ${userId}: ${payload}`);
    try {
      const data = JSON.parse(payload);
      const { toUserId, message } = data;

      const toUserSocket = userConnections.get(toUserId);
      if (toUserSocket) {
        toUserSocket.send(message);
      } else {
        ws.send(`⚠️ Usuário ${toUserId} não está conectado.`);
      }
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