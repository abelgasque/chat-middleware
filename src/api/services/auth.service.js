const UserService = require("../services/user.service");
const { generateToken } = require("../../helpers/token.helper");
const BadRequestException = require("../models/exceptions/bad-request.exception");
const UnauthorizedRequestException = require("../models/exceptions/unauthorized-request.exception");

class AuthService {

    constructor() {
        this.userService = new UserService();
    }

    async login(email, password) {
        const user = await this.userService.readByEmailAndPassword(email, password);
        if (!user) {
            throw new UnauthorizedRequestException("Credenciais inválidas");
        }

        if (!user.active) {
            throw new BadRequestException("Usuário inátivo");
        }

        return generateToken(user);
    }
}

module.exports = AuthService;