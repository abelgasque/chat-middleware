import "dotenv/config";
import { Sequelize } from 'sequelize';

const dbConfig = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: process.env.NODE_ENV === 'development' ? console.log : false
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.config,
    dialect: "mysql",
    logging: dbConfig.logging,
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão ao banco de dados realizada com sucesso!');
    } catch (error) {
        console.error('Ocorreu um erro ao se conectar com banco de dados:', error);
    }
};

export { sequelize, connectToDatabase, dbConfig as development, dbConfig as production };