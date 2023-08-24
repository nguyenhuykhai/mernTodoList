const Room = require('../models/roomModel')
const mongoose = require('mongoose')

// create new room 
const createRoom = async (req, res) => {
    const {name, members} = req.body
    try {
        const room = await Room.create({ name, members})
        res.status(200).json(room)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// get all room
const getRooms = async (req, res) => {
    const { user_id } = req.body;
    try {
        const rooms = await Room.find({ members: user_id });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { createRoom, getRooms }
