const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admins = require('../model/AdminModel')

exports.adminLogin = async (req, res) => {
    console.log('inside admin login controller');

    const { username, password, remember } = req.body;

    try {
        const admin = await admins.findOne({ username });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                const token = jwt.sign({ admin: admin.username }, process.env.JWT_KEY, { expiresIn: remember ? '7d' : '1h' })
                res.cookie('adminToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', 
                    sameSite: 'none',
                    maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000
                });
                res.status(200).json('Login successfull')
            } else {
                res.status(401).json('Invalid credentials');
            }
        } else {
            res.status(401).json('Admin not found');
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.logoutcontroller = (req, res) => {
    res.clearCookie('adminToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
}