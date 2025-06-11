const Admin = require('../model/AdminModel');
const sendEmail = require('../middleware/mailer');
const bcrypt = require('bcryptjs');

const sendOtpToAdmin = async (req, res) => {
    console.log(req.body);

    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = Date.now() + 10 * 60 * 1000;

        admin.otp = otp;
        admin.otpExpiry = expiry;
        await admin.save();

        await sendEmail(email, "OTP for Password Reset", `Your OTP is: ${otp}`);

        res.status(200).json({ message: "OTP sent to email" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        console.log("Stored OTP:", admin.otp, "Received OTP:", otp);
        console.log("Expiry:", admin.otpExpiry, "Current Time:", Date.now());

        if (!admin || admin.otp !== otp || admin.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        admin.otp = null;
        admin.otpExpiry = null;
        await admin.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    sendOtpToAdmin,
    verifyOtp,
    resetPassword,
};
