const contribution = require('../models/contributor.model')

const contribute = async (req, res) => {
    const {courseTitle, courseDesc} = req.body

    const materialContrib = await contribution.create({
        user: req.user.id,
        courseTitle,
        courseDesc
    })
    return res.json({
        status: 201,
        msg: 'Created',
        details: [{
            contributedBy: req.user.name,
            title: courseTitle,
            description: courseDesc,
        }] 
        //contributor: req.user.n
    })


    // Posting to the studentArchive DB
    // course name
    //description - optional
    // file - .pdf, .docx e.t.c

    //@desc: Contributor would be able to make a post if authorized
}

module.exports = {
    contribute
}