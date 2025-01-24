import UserService from "../services/user.service.js";
import { generateToken, generateRefreshToken } from "../utils/token.helper.js";
import BadRequestException from "../utils/bad-request.exception.js";
import UnauthorizedRequestException from "../utils/unauthorized-request.exception.js";

class AuthService {
    constructor() {
        this.userService = new UserService();
    }

    async login(username, password) {
        const user = await this.userService.readByEmailAndPassword(username, password);
        if (!user) {
            throw new UnauthorizedRequestException("Credenciais inválidas");
        }

        if (!user.active) {
            throw new BadRequestException("Usuário inátivo");
        }

        return generateToken(user.email);
    }

    async refresh(token) {
        if (!token) {
            throw new UnauthorizedRequestException("Refresh token não fornecido");
        }
        return generateRefreshToken(token);
    }
}

export default AuthService;