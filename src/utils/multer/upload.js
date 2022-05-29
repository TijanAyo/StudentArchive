const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

const BUCKET = process.env.AWS_BUCKET
const s3 = new AWS.S3()

AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (_, file, cb){
            cb(null, file.originalname)
        }
    }) 
})

module.exports = upload