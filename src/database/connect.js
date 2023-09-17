const mongoose = require("mongoose");

const database = process.env.MONGODB_DATABASE;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${username}:${password}@cursonodejs.ngmkvdd.mongodb.net/${database}?retryWrites=true&w=majority`
        );
        console.log("Conexão ao banco de dados realizada com sucesso!");
    } catch (error) {
        console.error("Ocorreu um erro ao se conectar com banco de dados:", error);
    }
}

module.exports = connectToDatabase;