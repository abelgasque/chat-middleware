export function handleConnection(ws, req) {
  ws.on('message', (message) => {
    console.log('📩 Mensagem recebida:', message.toString());

    // Exemplo: ecoa de volta
    ws.send(`Você disse: ${message}`);
  });

  ws.on('close', () => {
    console.log('❌ Cliente desconectado');
  });

  // Envia uma mensagem de boas-vindas
  ws.send('👋 Conexão WebSocket estabelecida com sucesso!');
}