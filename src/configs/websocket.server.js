import { WebSocketServer } from 'ws';
import { handleConnection } from '../ws/handlers.js';

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    console.log('🔌 Novo cliente conectado via WebSocket');
    handleConnection(ws, req);
  });

  return wss;
}