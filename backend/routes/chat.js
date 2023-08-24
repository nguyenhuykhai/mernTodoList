const express = require('express')
const { createChat, getChats } = require('../controllers/chatController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// create chat
router.post('/createChat', createChat)

// find all chats in account
router.get('/getChats/:id', getChats)
 
module.exports = router