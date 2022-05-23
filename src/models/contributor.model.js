const mongoose = require('mongoose')

const contributorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required:true,
        ref: 'User'
    },
    courseTitle: {
        type: String,
        required: [true, 'Enter a course title']
    },
    courseCode: {
        type: String,
        require: true
    },
    courseDesc: {
        type: String,
        required: true
    }
},{timestamps: true})


module.exports = mongoose.model('Material', contributorSchema)