const contribution = require('../models/contributor.model')
const User = require('../models/auth.model')
const AWS = require('aws-sdk')
const BUCKET = process.env.AWS_BUCKET
const s3 = new AWS.S3()


const dashboard = async (req, res) => {
    return res.render('../views/contributor/dashboard.ejs')
    // return res.send(`Welcome ${user.name}`)
}

// DISPLAY ALL AVAIABLE COURSE
const Archive = async (req, res) => {
    const archive = await contribution.find()
    res.render('../views/courses/archive.ejs', {archive: archive})
}


const contribute = async (req, res) => {
    const {courseTitle, courseCode, courseDesc} = req.body
    const file = req.file
    console.log(file)
    try{
        await contribution.create({
            user: req.user.id,
            courseTitle,
            courseCode,
            courseDesc
        })
        res.json({
            status: 201,
            msg: req.file.location,
            details: [{
                contributedBy: req.user.name,
                title: courseTitle,
                courseCode: courseCode,
                description: courseDesc,
            }]
        })
        return render('/dashboard')
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

const download = async (req, res) =>{
    const filename = req.params.filename
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename}).promise()
    res.send(x.Body)
}


module.exports = {
    contribute,
    download,
    dashboard,
    Archive
}