const UserService = require("../services/user.service");
const { generateToken, generateRefreshToken } = require("../../helpers/token.helper");
const BadRequestException = require("../models/exceptions/bad-request.exception");
const UnauthorizedRequestException = require("../models/exceptions/unauthorized-request.exception");

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

module.exports = AuthService;