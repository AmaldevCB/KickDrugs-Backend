const express = require('express')
const { adminLogin } = require('./controllers/adminController')
const { addUserController } = require('./controllers/profileController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const { genderController, catController } = require('./controllers/dataController')

const router = new express.Router()

// admin login
router.post('/admin-login',adminLogin)

// add user
router.post('/add-user',jwtMiddleware,addUserController)

// get data
router.get('/genders', genderController);
router.get('/categories', catController);

module.exports = router