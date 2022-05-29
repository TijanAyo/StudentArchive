const userAuth = require('../models/auth.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//  POST /auth/register/contributor
const register = async (req, res) => {
    try{
        const {name, email, bio, password} = req.body

        // validate user input
        if (!name || !email || !password) {
            req.flash('error_msg','Name, Email and Password required')
            return res.redirect('/auth/contributor/register')
        }

        // Check for: Duplicate user with email
        const checkUserEmail = await userAuth.findOne({email})
    
        if (checkUserEmail){
            // Return an error message
            req.flash('error_msg','Email is already in use')
            return res.redirect('/auth/contributor/register')
            /* return res.json({
                status: '409 Conflict',
                err: 'Already Exist',
                msg: `${email} already in use`
            }) */
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
            req.flash('success_msg','You have now registered!')
            return res.redirect('/dashboard')
            /*return res.json({
                status: 201,
                user,
            })*/
            
        }
        req.flash('error_msg', 'Something went wrong')
        /*return res.status(400).send({
            msg: 'Invalid user data...something went wrong'
        })*/
        return res.redirect('/auth/contributor/register ')
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
    
}

// POST /auth/login/contributor
const login = async (req, res) => {


    const {email, password } = req.body

    // validate user input
    if (!email || !password){
        req.flash('error_msg', 'Incorrect email or password')
        return res.redirect('/auth/contributor/login')
    }

    const findUser = await userAuth.findOne({email})

    if(findUser && (await bcrypt.compare(password, findUser.password))){
        /* res.send({
            status: 200,
            msg: `${findUser.name} is now logged in`,
            token: generateToken(findUser.id)
        }) */
        return res.redirect('/dashboard')
        
    }
    req.flash('error', 'Unathorized')
    res.json({status: '401 Unauthorized'})
    // return res.redirect('/auth/contributor/login')
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