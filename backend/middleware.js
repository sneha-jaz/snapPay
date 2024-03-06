const { JWT_SECRET } = require('./config.js')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // authenticate token
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: 'Invalid token'
        })
    }
    //fetch and store the token
    const token = authHeader.split(' ')[1];

    //decode and verify if the userId exists
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
    } catch (err) {
        return res.status(403).json({});
    }
}

module.exports = authMiddleware;