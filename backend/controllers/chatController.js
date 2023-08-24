const Chat = require('../models/chatModel')
const mongoose = require('mongoose')

// create new chat
const createChat = async (req, res) => {
    const {participants, messages, room_id} = req.body
    try {
        const chat = await Chat.create({ participants, messages, room_id })
        res.status(200).json(chat)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// get all chat
const getChats = async (req, res) => {
    const room_id = req.params.id;
    try {
        const chats = await Chat.find({ room_id: room_id}).sort({createdAt:-1})
        res.status(200).json(chats)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = { createChat, getChats }