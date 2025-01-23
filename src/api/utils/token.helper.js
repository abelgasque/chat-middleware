import jwt from 'jsonwebtoken';
import UnauthorizedRequestException from "../models/exceptions/unauthorized-request.exception.js";

const { JWT_SECRET, JWT_EXPIRE, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE_DAY } = process.env;

const generateToken = (username) => {
    const data = { email: username };
    const access_token = jwt.sign(data, JWT_SECRET, { expiresIn: `${JWT_EXPIRE}s` });
    const refresh_token = jwt.sign(data, JWT_REFRESH_SECRET, { expiresIn: `${JWT_REFRESH_EXPIRE_DAY}d` });
    return { access_token, refresh_token, expires: JWT_EXPIRE };
};

const generateRefreshToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, JWT_REFRESH_SECRET);
        const newToken = generateToken(decoded.email);
        return newToken;
    } catch (err) {
        throw new UnauthorizedRequestException("Refresh token inválido");
    }
};

export { generateToken, generateRefreshToken };