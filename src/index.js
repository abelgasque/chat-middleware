import "dotenv/config";
import app from './configs/http-server.js';
import { connectToDatabase } from "./database/connect.js";
import connectToAmqp from "./configs/amqp.server.js";

const port = process.env.NODE_PORT || 9090;

await connectToDatabase();
await connectToAmqp();

const server = app();

server.listen(port, () => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Aplicação executando em: http://localhost:${port}`);
    }
});