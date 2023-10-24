const jwt = require('jsonwebtoken');
const UserService = require("../services/user.service");

const userService = new UserService();
const { JWT_SECRET } = process.env;

class BearerAuthMiddleware {
    authenticate(req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "O serviço não pode ser acessado sem um token válido." });
        }

        jwt.verify(token.split(' ')[1].trim(), JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(token);
                return res.status(403).json({ message: "O token fornecido é inválido." });
            }

            const user = userService.readByEmail(decoded.email);
            if (!user) {
                return res.status(404).json({ message: "Usuário não localizado" });
            }

            req.user = decoded;
            next();
        });
    }
};

module.exports = BearerAuthMiddleware;