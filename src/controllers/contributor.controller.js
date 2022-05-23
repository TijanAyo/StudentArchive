const contribution = require('../models/contributor.model')

const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

AWS.config.update({
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const BUCKET = process.env.AWS_BUCKET
const s3 = new AWS.S3()


const upload = multer({
    storage: multerS3({
        s3:s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (_, file, cb){
            cb(null, file.originalname)
        }
    }) 
})

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
        return res.json({
            status: 201,
            msg: req.file.location,
            details: [{
                contributedBy: req.user.name,
                title: courseTitle,
                courseCode: courseCode,
                description: courseDesc,
            }]
        })
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
    contribute, download, upload
}