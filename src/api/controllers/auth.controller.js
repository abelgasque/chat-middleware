const UserService = require("../services/user.service");
const { generateToken } = require("../../helpers/token.helper");

const userService = new UserService();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuário
 */
class AuthController {

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userService.readByEmailAndPassword(email, password);

            if (!user) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            if (!user.active) {
                return res.status(400).json({ message: "Usuário inátivo" });
            }

            res.status(200).json(generateToken(user));
        } catch (error) { next(error); }
    };
}

module.exports = AuthController;