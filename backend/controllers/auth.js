const user =require('../model/user');
const jwt = require('jsonwebtoken');

// helpers
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// Register a new user

exports.signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }   
        const User = new user({ email, username, password });
        await User.save();
        const token = generateToken(User);
        res.status(201).json({ token });
    } catch (error) {
console.error(error); // log the actual error
res.status(500).json({ message: 'Server error', error: error.message });

    }   
};

// Login an existing user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });
        if (!User|| !(await User.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(User);
        res.status(200).json({ message:'login successful', token });
    } catch (error) {
        console.error(error); // log the actual error
        res.status(500).json({ message: 'Server error', error: error.message });      
    }
    } ;