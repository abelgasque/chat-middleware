import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuário
 */
class AuthController {

    constructor() {
        this.authService = new AuthService();
        this.userService = new UserService();
    }

    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            return res.status(200).json(await this.authService.login(username, password));
        } catch (error) { next(error); }
    };

    refresh = async (req, res, next) => {
        try {
            const { refresh_token } = req.body;
            return res.status(200).json(await this.authService.refresh(refresh_token));
        } catch (error) { next(error); }
    };

    create = async (req, res, next) => {
        try {
            const { name, email, password } = req.body
            return res.status(201).json(await this.userService.create({
                name, email, password
            }));
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;