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

module.exports = upload