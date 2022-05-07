const mongoose = require('mongoose')

const authSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bio:{
        type:String,
        required: false
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', authSchema)