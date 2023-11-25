const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false
    },
    accountCreatedOn:{
        type: String,
        required: true,
        immutable: true,
        default: () => { return new Date(Date.now()).toLocaleString('en-IN',{ timeZone: 'Asia/Kolkata'}) }
    }

}, {timestamps: true})

module.exports = mongoose.models.User || mongoose.model('User', userSchema, 'User')