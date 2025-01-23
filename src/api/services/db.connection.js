import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config.js';

const connectToDatabase = async () => {
    try {
        if (dbConfig.dialect === 'mysql') {
            const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
                host: dbConfig.host,
                port: dbConfig.config,
                dialect: dbConfig.dialect,
                logging: dbConfig.logging,
            });
            await sequelize.authenticate();
            console.log('Conexão ao banco de dados realizada com sucesso!');
        }
    } catch (error) {
        console.error('Ocorreu um erro ao se conectar com banco de dados:', error);
    }
};

export { connectToDatabase };