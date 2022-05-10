const userAuth = require('../models/auth.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
                status: 201,
                user,
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
const login = async (req, res) => {
    const {email, password } = req.body

    const findUser = await userAuth.findOne({email})

    if(findUser && (await bcrypt.compare(password, findUser.password))){
        return res.json({
            status: 200,
            msg: `${findUser.name} Logged in`,
            token: generateToken(findUser.id)
        })
    }
    return res.json({
        status: '401 Unauthorized'
    })
}

// Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_Secret_kEY, {
        expiresIn: '1d'
    })
}

module.exports = {
    register, login
}