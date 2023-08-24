const express = require('express')
const { createRoom, getRooms } = require('../controllers/roomController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// create chat
router.post('/createRoom', createRoom)

// find all chats in account
router.get('/getRooms', getRooms)
 
module.exports = router