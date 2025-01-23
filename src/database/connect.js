import { Sequelize } from 'sequelize';
import dbConfig from '../api/config/db.config.js';

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.config,
    dialect: dbConfig.dialect,
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