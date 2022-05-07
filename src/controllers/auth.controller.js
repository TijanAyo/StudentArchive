const userAuth = require('../models/auth.model')
const bcrypt = require('bcryptjs')

//  POST /auth/register/contributor
const register = async (req, res) => {
    const {name, email, bio, password} = req.body

    // Duplicate user with email
    const userEmailCheck = await userAuth.findOne({email})
    
    if (userEmailCheck){
        
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
        return res.status(201).json({
            msg: 'Created',
            user
        })
    }
    return res.status(400).json({
        msg: 'Invalid user data...something went wrong'
    })
}

// POST /auth/login/contributor
const login = (req, res) => {
    return res.send('authorizing user entry')
}

module.exports = {
    register, login
}