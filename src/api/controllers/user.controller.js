const UserService = require("../services/user.service");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestão de usuário
 */
class UserController {

    constructor() {
        this.userService = new UserService();
    }

    create = async (req, res, next) => {
        try {
            return res.status(201).json(await this.userService.create(req.body));
        } catch (error) { next(error); }
    };

    read = async (req, res, next) => {
        try {
            const { firstName, lastName, email, active } = req.query;
            const filters = { firstName, lastName, email, active };
            return res.status(200).json(await this.userService.read(filters));
        } catch (error) { next(error); }
    };

    readById = async (req, res, next) => {
        try {
            const id = req.params.id;
            return res.status(200).json(await this.userService.readById(id));
        } catch (error) { next(error); }
    };

    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            return res.status(200).json(await this.userService.update(id, req.body, { new: true }));
        } catch (error) { next(error); }
    };

    delete = async (req, res, next) => {
        try {
            const id = req.params.id;
            return res.status(204).json(await this.userService.delete(id));
        } catch (error) { next(error); }
    };

}

module.exports = UserController;