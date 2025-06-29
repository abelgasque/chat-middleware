import AmqpService from "../services/amqp.service.js";
import UserService from "../services/user.service.js";
import ApiResponse from "../entities/responses/api.response.js"

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestão de usuário
 */
class UserController {
    constructor() {
        this.userService = new UserService();
        this.amqpService = new AmqpService();
    }

    create = async (req, res, next) => {
        const user = req.body;
        try {
            if (process.env.RABBITMQ_ENABLE?.toLowerCase() === 'true') {
                await this.amqpService.publishToExchange('user.events', 'user.created', {
                    type: 'user.created',
                    payload: user
                });
                return res.status(201).json(ApiResponse.success("Evento processado com sucesso"));
            }

            await this.userService.create();
            return res.status(201).json(ApiResponse.created());
        } catch (error) {
            next(error);
        }
    };

    read = async (req, res, next) => {
        try {
            return res.status(200).json(await this.userService.read(req.query));
        } catch (error) {
            next(error);
        }
    };

    readById = async (req, res, next) => {
        try {
            const id = req.params.id;
            return res.status(200).json(await this.userService.readById(id));
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        const id = req.params.id;
        const body = req.body;

        try {
            if (process.env.RABBITMQ_ENABLE?.toLowerCase() === 'true') {
                await this.amqpService.publishToExchange('user.events', {
                    type: 'user.updated',
                    payload: { id: id, body: body }
                });
                return res.status(200).json(ApiResponse.success("Evento processado com sucesso"));
            }

            await this.userService.update(id, body, { new: true });
            return res.status(200).json(ApiResponse.success());
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        const id = req.params.id;
        try {
            if (process.env.RABBITMQ_ENABLE?.toLowerCase() === 'true') {
                await this.amqpService.publishToExchange('user.events', {
                    type: 'user.deleted',
                    payload: id
                });
                return res.status(204).json(ApiResponse.success("Evento processado com sucesso"));
            }

            await this.userService.delete(id);
            return res.status(204).json(ApiResponse.deleted());
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;