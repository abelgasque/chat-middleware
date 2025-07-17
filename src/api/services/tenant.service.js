import { Tenant } from "../../database/models/index.js";
import NotFoundRequestException from "../utils/not-found-request.exception.js";
import { Sequelize } from "sequelize";

const {
    DB_SERVER,
    DB_PORT,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env;

class TenantsService {
    async create(data) {
        // const tenant = await Tenant.create(data);

        const databaseName = data.database;
        const sequelize = new Sequelize(
            DB_DATABASE,
            DB_USERNAME,
            DB_PASSWORD,
            {
                host: DB_SERVER,
                port: DB_PORT,
                dialect: "postgres",
                logging: false,
            }
        );

        try {
            await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
        } finally {
            await sequelize.close();
        }

        return tenant;
    }

    async read() {
        return await Tenant.findAll();
    }

    async readById(id) {
        const tenant = await Tenant.findByPk(id);
        if (!tenant) throw new NotFoundRequestException("Tenant não encontrado");
        return tenant;
    }

    async update(id, data) {
        const tenant = await this.readById(id);
        return await tenant.update(data);
    }

    async delete(id) {
        const tenant = await this.readById(id);
        await tenant.destroy();
    }
}

export default TenantsService;