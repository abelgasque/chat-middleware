const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = process.env;

const generateToken = (user) => {
    const data = { email: user.email };
    const access_token = jwt.sign(data, JWT_SECRET, { expiresIn: `${JWT_EXPIRE}s` });
    const refresh_token = jwt.sign(data, JWT_SECRET);
    return { access_token, refresh_token, expires: JWT_EXPIRE };
};

module.exports = { generateToken }