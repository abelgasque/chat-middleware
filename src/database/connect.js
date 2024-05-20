require('dotenv').config();
const { Sequelize } = require('sequelize');

const { NODE_ENV, DB_SERVER, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

const config = {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_SERVER,
    port: DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
};

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_SERVER,
    port: DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        NODE_ENV === 'development' && console.log('Conexão ao banco de dados realizada com sucesso!');
    } catch (error) {
        NODE_ENV === 'development' && console.error('Ocorreu um erro ao se conectar com banco de dados:', error);
    }
};

module.exports = { sequelize, connectToDatabase, development: config, production: config };
