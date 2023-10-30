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
            return res.status(201).json(await userService.create(req.body));
        } catch (error) { next(error); }
    };

    read = async (req, res, next) => {
        try {
            const { firstName, lastName, email, active } = req.query;
            const filters = { firstName, lastName, email, active };
            return res.status(200).json(await userService.read(filters));
        } catch (error) { next(error); }
    };

    readById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await userService.readById(id);
            return res.status((user) ? 200 : 204).json(user);
        } catch (error) { next(error); }
    };

    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await userService.readById(id);
            if (!user) {
                return res.status(400).json({ error: "Usuário não localizado", message: "Identificador do usuário não localizado" });
            }

            if (user.email != req.body?.email) {
                const findByEmail = await userService.readByEmail(req.body.email);
                if (findByEmail && findByEmail._id != user._id) {
                    return res.status(400).json({ error: "Email já cadastrado", message: "Email cadastrado para outro usuário" });
                }
            }

            return res.status(200).json(await userService.update(id, req.body, { new: true }));
        } catch (error) { next(error); }
    };

    delete = async (req, res, next) => {
        try {
            const id = req.params.id;
            await userService.delete(id);
            return res.status(204).json(null);
        } catch (error) { next(error); }
    };

}

module.exports = UserController;