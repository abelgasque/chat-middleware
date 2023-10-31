const AuthService = require("../services/auth.service");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuário
 */
class AuthController {

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            return res.status(200).json(await this.authService.login(email, password));
        } catch (error) { next(error); }
    };
}

module.exports = AuthController;