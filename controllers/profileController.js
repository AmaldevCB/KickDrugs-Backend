const users = require('../model/userModel')
const nodemailer = require('nodemailer');

exports.addUserController = async (req, res) => {
    console.log('inside add user controller');

    const { name, image, dateOfBirth, phone, email, district, panchayat, card } = req.body

    try {
        const existingUser = await users.findOne({
            $or: [
                { email: email },
                { phone: phone }
            ]
        }); if (existingUser) {
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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "amaldev1845@gmail.com", 
                pass: "nyhwzbgbgwmveabx", 
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Digital ID Card',
            text: `Hi ${name},\n\nAttached is your generated ID card.\n\nRegards,\nGovt. of Kerala`,
            attachments: [
                {
                    filename: 'id-card.png',
                    content: card.split("base64,")[1],
                    encoding: 'base64'
                }
            ]
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json(newUser);

    } catch (error) {
        console.error('Error in addUserController:', error);
        res.status(500).json({ message: error.message });
    }

}