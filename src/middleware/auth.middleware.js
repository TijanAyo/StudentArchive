const User = require('../models/auth.model')
const jwt = require('jsonwebtoken')


const Protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decode = jwt.verify(token, process.env.JWT_Secret_kEY)

            req.user = await User.findById(decode.id).select('-password')

            next()
        }
        catch(err){
            console.log(err)
            return res.json({
                status: 401,
                msg: 'Unauthorized'
            })
        }
    }

    if(!token){
        return res.json({
            status: 401,
            msg: 'Not Authorized, No Token'
        })
    }
}

module.exports = {
    Protect
}