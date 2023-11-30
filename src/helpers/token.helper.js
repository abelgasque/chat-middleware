const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE_DAY } = process.env;
const UnauthorizedRequestException = require("../api/models/exceptions/unauthorized-request.exception");

const generateToken = (username) => {
    const data = { email: username };
    const access_token = jwt.sign(data, JWT_SECRET, { expiresIn: `${JWT_EXPIRE}s` });
    const refresh_token = jwt.sign(data, JWT_REFRESH_SECRET, { expiresIn: `${JWT_REFRESH_EXPIRE_DAY}d` });
    return { access_token, refresh_token, expires: JWT_EXPIRE };
};

const generateRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                reject(new UnauthorizedRequestException("Refresh token inválido"));
            } else {
                try {
                    const newToken = await generateToken(decoded.email);
                    resolve(newToken);
                } catch (error) {
                    reject(error);
                }
            }
        });
    });
};

module.exports = { generateToken, generateRefreshToken }