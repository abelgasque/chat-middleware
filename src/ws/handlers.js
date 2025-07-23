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

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const { toUserId, content } = data;

      const toUserSocket = userConnections.get(toUserId);
      if (toUserSocket) {
        toUserSocket.send(
          JSON.stringify({
            fromUserId: userId,
            content,
          })
        );
      } else {
        ws.send(`⚠️ Usuário ${toUserId} não está conectado.`);
      }
    } catch (err) {
      ws.send('❌ Erro ao processar mensagem');
    }
  });

  ws.on('close', () => {
    console.log(`❌ Usuário ${userId} desconectado`);
    userConnections.delete(userId);
  });
}