const jwt=require('jsonwebtoken');
const user = require('../model/user');

// Middleware to authenticate user using JWT
exports.authenticate = async (req, res, next) => {
    try {
        //check for token in headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }
        // 2.extract token
        const token = authHeader.split(' ')[1];
        //2 .verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //3. attach user to request
        req.user = await user.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        //5.Allow access to protected route
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};