const Chat = require('../models/chatModel')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const { getIOInstance } = require('../socketManager'); 
const io = getIOInstance();

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
    const user_id = req.user._id;
    try {
        const chats = await Chat.find({ room_id: room_id}).sort({createdAt:-1})
        
        // Emit the new message to the chat room using socket.io
        io.to(room_id).emit('userJoined', user_id);
        res.status(200).json(chats)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// add messages into chat
const updateChatWithNewMessage = async (req, res) => {
    const { _id, message, email } = req.body
    const user_id = req.user._id
        const newMessage = {
            _id: new ObjectId(),
            sender: new ObjectId(user_id),
            content: message,
            email: email,
            createdAt: new Date()
        };
    const chatId = new ObjectId(_id);

    try {
        // Update the chat document with the new message
        const updateResult = await Chat.updateOne(
            { _id: chatId },
            { $push: { messages: newMessage } }
        );

        // Emit the new message to the chat room using socket.io
        io.emit('newMessage', newMessage);
        res.status(200)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = { createChat, getChats, updateChatWithNewMessage }