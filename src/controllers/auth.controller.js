const userAuth = require('../models/auth.model')


//  POST /auth/register/contributor
const register = async (req, res) => {
    const {name, email, bio, password} = req.body

    const user = await userAuth.create({
        name,
        email,
        bio,
        password
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