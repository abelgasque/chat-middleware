import { Sequelize } from 'sequelize';

const { NODE_ENV, DB_SERVER, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

const config = {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_SERVER,
    port: DB_PORT,
    dialect: 'mysql',
    logging: NODE_ENV === 'development' ? console.log : false
};

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_SERVER,
    port: DB_PORT,
    dialect: 'mysql',
    logging: NODE_ENV === 'development' ? console.log : false,
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        if (NODE_ENV === 'development') {
            console.log('Conexão ao banco de dados realizada com sucesso!');
        }
    } catch (error) {
        if (NODE_ENV === 'development') {
            console.error('Ocorreu um erro ao se conectar com banco de dados:', error);
        }
    }
};

export { sequelize, connectToDatabase, config as development, config as production };