import "dotenv/config";
import app from './configs/http-server.js';

const port = process.env.NODE_PORT || 9090;

app().listen(port, () => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Aplicação executando em: http://localhost:${port}`);
    }
});