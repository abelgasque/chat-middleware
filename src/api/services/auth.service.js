import UserService from "../services/user.service.js";
import BadRequestException from "../utils/bad-request.exception.js";
import UnauthorizedRequestException from "../utils/unauthorized-request.exception.js";

import jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRE, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE_DAY } = process.env;
class AuthService {

    constructor() {
        this.userService = new UserService();
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET);
        } catch (err) {
            throw new UnauthorizedRequestException("Token inválido");
        }
    };

    generateToken(name, username) {
        const data = { name, email: username };
        const access_token = jwt.sign(data, JWT_SECRET, { expiresIn: `${JWT_EXPIRE}s` });
        const refresh_token = jwt.sign(data, JWT_REFRESH_SECRET, { expiresIn: `${JWT_REFRESH_EXPIRE_DAY}d` });
        return { access_token, refresh_token, expires: JWT_EXPIRE };
    };

    async login(username, password) {
        const user = await this.userService.readByEmail(username);
        if ((!user) || (user.password != password)) {
            throw new UnauthorizedRequestException("Credenciais inválidas");
        }

        if (!user.activeAt) throw new BadRequestException("Usuário inátivo");
        if (user.blockedAt) throw new BadRequestException("Usuário bloqueado");

        await user.update({
            nuLogged: (user.nuLogged + 1),
            loggedAt: Date(),
        });
        return this.generateToken(user.name, user.email);
    }

    async refresh(token) {
        if (!token) throw new UnauthorizedRequestException("Token não fornecido");

        const decodeToken = this.verifyToken(token);
        const user = await this.userService.readByEmail(decodeToken.email);

        if (!user) throw new UnauthorizedRequestException("Usuário não encontrado");

        await user.update({
            nuRefreshed: (user.nuRefreshed + 1),
            refreshedAt: Date(),
        });
        return this.generateToken(decodeToken.name, decodeToken.email);
    }
}

export default AuthService;