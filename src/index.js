import "dotenv/config";
import app from './configs/http-server.js';
import cors from 'cors';
import { connectToDatabase } from "./database/connect.js";

const port = process.env.NODE_PORT || 9090;

await connectToDatabase();

const server = app();

server.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

server.listen(port, () => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Aplicação executando em: http://localhost:${port}`);
    }
});