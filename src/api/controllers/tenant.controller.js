import crypto from 'crypto';

import AmqpService from "../services/amqp.service.js";
import TenantsService from "../services/tenant.service.js";
import ApiResponse from "../entities/responses/api.response.js"

/**
 * @swagger
 * tags:
 *   name: Tenant
 *   description: Gestão de tenant
 */
class TenantController {
    constructor() {
        this.tenantService = new TenantsService();
        this.amqpService = new AmqpService();
    }

    create = async (req, res, next) => {
        const tenant = req.body;
        try {
            if (process.env.RABBITMQ_ENABLE?.toLowerCase() === 'true') {
                await this.amqpService.publishToExchange('tenant.events', 'tenant.created', {
                    type: 'tenant.created',
                    payload: tenant
                });
                return res.status(201).json(ApiResponse.success("Evento processado com sucesso"));
            }

            await this.tenantService.create({
                ...tenant, 
                guid: crypto.randomUUID(),
                createdAt: new Date(),
            });
            return res.status(201).json(ApiResponse.created());
        } catch (error) {
            next(error);
        }
    };

    read = async (req, res, next) => {
        try {
            return res.status(200).json(await this.tenantService.read(req.query));
        } catch (error) {
            next(error);
        }
    };

    readById = async (req, res, next) => {
        try {
            const id = req.params.id;
            return res.status(200).json(await this.tenantService.readById(id));
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        const id = req.params.id;
        const body = req.body;

        try {
            if (process.env.RABBITMQ_ENABLE?.toLowerCase() === 'true') {
                await this.amqpService.publishToExchange('tenant.events', {
                    type: 'tenant.updated',
                    payload: { id: id, body: body }
                });
                return res.status(200).json(ApiResponse.success("Evento processado com sucesso"));
            }

            await this.tenantService.update(id, body, { new: true });
            return res.status(200).json(ApiResponse.success());
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        const id = req.params.id;
        try {
            if (process.env.RABBITMQ_ENABLE?.toLowerCase() === 'true') {
                await this.amqpService.publishToExchange('tenant.events', {
                    type: 'tenant.deleted',
                    payload: id
                });
                return res.status(204).json(ApiResponse.success("Evento processado com sucesso"));
            }

            await this.tenantService.delete(id);
            return res.status(204).json(ApiResponse.deleted());
        } catch (error) {
            next(error);
        }
    };
}

export default TenantController;