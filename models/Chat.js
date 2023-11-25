const mongoose = require('mongoose')



const chatSchema= new mongoose.Schema({

    msgContent: {
        type: String,
        required: true
    },
    msgTime: {
        type: String,
        required: true,
        immutable: true,
        default: () => { return new Date(Date.now()).toLocaleString('en-IN',{ timeZone: 'Asia/Kolkata'}) }
    },
    peers: {
        type: [String],
        required: true
    },
    participants: {
        type: [String],
        required: true
    },

    sender: {
        type: String,
        required: true
    },


    senderName: {
        type: String,
        required: true
    },

    receipient: {
        type: String,
        required: true
    },


    receipientName: {
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    target:{
        type: String,
        required: true
    },
    createdOn:{
        type: String,
        required: true,
        immutable: true,
        default: () => { return new Date(Date.now()).toLocaleString('en-IN',{ timeZone: 'Asia/Kolkata'}) }
    }

}, {timestamps: true})

module.exports = mongoose.models.Chat || mongoose.model('Chat', chatSchema, 'Chat')