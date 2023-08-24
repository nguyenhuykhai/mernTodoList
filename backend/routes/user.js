const express = require('express');

//controller functions
const { loginUser, signupUser, getAllUsers } = require('../controllers/userController')

const router = express.Router();

//login router
router.post('/login', loginUser)

//signup router
router.post('/signup', signupUser)

//get all users
router.get('/chat', getAllUsers)

module.exports = router