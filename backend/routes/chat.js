const express = require('express')
const { createChat, getChats, updateChatWithNewMessage } = require('../controllers/chatController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// create chat
router.post('/createChat', createChat)

// find all chats in account
router.get('/:id', getChats)

// add message to chat
router.put('/addMessage', updateChatWithNewMessage) 
 
module.exports = router