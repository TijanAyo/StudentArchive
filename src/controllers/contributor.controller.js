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
    })


    // Posting to the studentArchive DB -- done
    // course name  -- done
    //description - optional -- done
    // file - .pdf, .docx e.t.c

    //@desc: Contributor would be able to make a post if authorized
}

module.exports = {
    contribute
}