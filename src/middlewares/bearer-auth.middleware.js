import jwt from "jsonwebtoken";
import UserService from "../api/services/user.service.js";

const userService = new UserService();
const { JWT_SECRET } = process.env;

class BearerAuthMiddleware {
    authenticate(req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "O serviço não pode ser acessado sem um token válido." });
        }

        jwt.verify(token.split(' ')[1].trim(), JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "O token fornecido é inválido." });
            }

            const user = await userService.readByEmail(decoded.email);
            if (!user) {
                return res.status(404).json({ message: "Usuário não localizado" });
            }

            req.user = decoded;
            next();
        });
    }
}

export default BearerAuthMiddleware;