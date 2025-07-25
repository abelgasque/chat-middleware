import "dotenv/config";
import app from './configs/http-server.js';
import http from 'http';
import { connectToDatabase } from "./database/connect.js";
import connectToAmqp from "./configs/amqp.server.js";
import { setupWebSocket } from './configs/websocket.server.js'; 

const port = process.env.NODE_PORT || 9090;

await connectToDatabase();
await connectToAmqp();

const server = http.createServer(app());

server.listen(port, '0.0.0.0', () => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Aplicação executando em: http://localhost:${port}`);
    }
});

setupWebSocket(server);