const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.userId = await User.findOne(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = protect;