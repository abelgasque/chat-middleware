import { Tenant } from "../../database/models/index.js";
import { getTenantSequelize } from "../../database/connect-tenant.js";
import NotFoundRequestException from "../utils/not-found-request.exception.js";

class TenantsService {
    async create(data) {

        const tenant = await Tenant.create(data);
        getTenantSequelize(data.database);

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