const mongoose = require("mongoose");

const { DB_SERVER, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_SERVER}:${DB_PORT}/${DB_DATABASE}`;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri);
        (process.env.NODE_ENV === 'debug') && console.log("Conexão ao banco de dados realizada com sucesso!");
    } catch (error) {
        (process.env.NODE_ENV === 'debug') && console.error("Ocorreu um erro ao se conectar com banco de dados:", error);
    }
}

module.exports = connectToDatabase;