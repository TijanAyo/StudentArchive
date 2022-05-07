require('dotenv').config()

const mongoose = require('mongoose')

const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.dbURI)
        console.log('MongoDB Connected')
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
    
}

module.exports = ConnectDB