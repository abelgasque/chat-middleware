import "dotenv/config";
import app from './configs/http-server.js';
import { connectToDatabase } from "./database/connect.js";

const port = process.env.NODE_PORT || 9090;

await connectToDatabase();

app().listen(port, () => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Aplicação executando em: http://localhost:${port}`);
    }
});