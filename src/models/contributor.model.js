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
    courseDesc: {
        type: String,
        required: true
    }
},{timestamps: true})

// contributor schema basic structure
// user
// course title
//  course description
// timestamps

module.exports = mongoose.model('Material', contributorSchema)