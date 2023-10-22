const UserService = require("../services/user.service");
const userService = new UserService();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestão de usuário
 */
class UserController {

    create = async (req, res, next) => {
        try {
            res.status(201).json(await userService.create(req.body));
        } catch (error) { next(error); }
    };

    read = async (req, res, next) => {
        try {
            const { firstName, lastName, email, active } = req.query;
            const filters = { firstName, lastName, email, active };
            res.status(200).json(await userService.read(filters));
        } catch (error) { next(error); }
    };

    readById = async (req, res, next) => {
        try {
            const id = req.params.id;
            res.status(200).json(await userService.readById(id));
        } catch (error) { next(error); }
    };

    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            res.status(200).json(await userService.update(id, req.body, { new: true }));
        } catch (error) { next(error); }
    };

    delete = async (req, res, next) => {
        try {
            const id = req.params.id;
            await userService.delete(id);
            res.status(204).json(null);
        } catch (error) { next(error); }
    };

}

module.exports = UserController;