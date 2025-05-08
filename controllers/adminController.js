const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admins = require('../model/AdminModel')

exports.adminLogin = async (req, res) => {
    console.log('inside admin login controller');

    const { username, password } = req.body;

    try {
        const admin = await admins.findOne({ username });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                const token = jwt.sign({ admin: admin.username },process.env.JWT_KEY)
                res.status(200).json(token)
            }else{
                res.status(401).json('Invalid credentials');            }
        }else{
            res.status(404).json( 'Admin not found' );        }
    } catch (error) {
        res.status(500).json(error)
    }
}