const express = require('express')
const { adminLogin, logoutcontroller } = require('./controllers/adminController')
const { addUserController } = require('./controllers/profileController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const { genderController, catController } = require('./controllers/dataController')
const { sendOtpToAdmin, verifyOtp, resetPassword } = require('./controllers/forgotpassword')

const router = new express.Router()

// admin login
router.post('/admin-login',adminLogin)

// add user
router.post('/add-user',addUserController)

// get data
router.get('/genders', genderController);
router.get('/categories', catController);

// remember me
router.get('/dashboard', jwtMiddleware, (req, res) => {
    console.log('inside remember');
    
  res.status(200).json({ message: 'Authorized' });
});

// forgot password
router.post('/admin/send-otp', sendOtpToAdmin);
router.post('/admin/verify-otp', verifyOtp);
router.post('/admin/reset-password', resetPassword);


// logout
router.get('/logout',logoutcontroller)

module.exports = router