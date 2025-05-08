const users = require('../model/userModel')

exports.addUserController = async (req, res) => {
    console.log('inside add user controller');

    const { name, image, dateOfBirth, phone, email, district, panchayat } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(406).json('User already exists')
        }
        const newUser = new users({
            name,
            image,
            dateOfBirth,
            phone,
            email,
            district,
            panchayat
        });
        await newUser.save();
        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json(error)
    }

}