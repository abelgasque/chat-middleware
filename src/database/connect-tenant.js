import { Sequelize } from 'sequelize';

const {
    DB_DIALECT,
    DB_SERVER,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_MASTER_DATABASE,
} = process.env;

const tenantConnections = new Map();

export async function getTenantSequelize(databaseName) {
    const masterSequelize = new Sequelize(DB_MASTER_DATABASE, DB_USERNAME, DB_PASSWORD, {
        host: DB_SERVER,
        port: DB_PORT,
        dialect: DB_DIALECT,
        logging: false,
    });

    try {
        if (tenantConnections.has(databaseName)) {
            return tenantConnections.get(databaseName);
        }

        if (DB_DIALECT === 'postgres') {
            const result = await masterSequelize.query(`SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`);
            if (result[0].length === 0) {
                await masterSequelize.query(`CREATE DATABASE "${databaseName}"`);
            }
        } else if (DB_DIALECT === 'mysql') {
            await masterSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
        }

        const sequelize = new Sequelize(databaseName, DB_USERNAME, DB_PASSWORD, {
            host: DB_SERVER,
            port: DB_PORT,
            dialect: DB_DIALECT,
            logging: false,
        });

        tenantConnections.set(databaseName, sequelize);
        return sequelize;
    } catch (error) {
        console.error("❌ Erro ao conectar no banco de dados do tenant:", error);
    } finally {
        await masterSequelize.close();
    }
}