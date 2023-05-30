const jwt = require("jsonwebtoken");

const config = process.env;

const verifyUserToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ success: 0, msg: 'A token is required for authentication!' });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY_USER);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ success: 0, msg: 'Invalid token!' });
    }
    return next();
};

module.exports = verifyUserToken;