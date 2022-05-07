const userAuth = require('../models/auth.model')
const bcrypt = require('bcryptjs')

//  POST /auth/register/contributor
const register = async (req, res) => {
    try{
        const {name, email, bio, password} = req.body

        // Duplicate user with email
        const checkUserEmail = await userAuth.findOne({email})
    
        if (checkUserEmail){
            // Return an error message
            return res.json({
                status: '409 Conflict',
                err: 'Already Exist',
                msg: `${email} already in use`
            })
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedpwd = await bcrypt.hash(password, salt)

        const user = await userAuth.create({
            name,
            email,
            bio,
            password:hashedpwd
        })
        if(user){
            return res.json({
                status: '201 Created',
                user
            })
        }
        return res.status(400).json({
            msg: 'Invalid user data...something went wrong'
        })
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
    
}

// POST /auth/login/contributor
const login = (req, res) => {
    return res.send('authorizing user entry')
}

module.exports = {
    register, login
}