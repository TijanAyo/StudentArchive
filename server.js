const express = require('express')
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


// Routes
const index = require('./src/routes/index.routes')
const auth = require('./src/routes/auth.routes')
const contributor = require('./src/routes/contributor.routes')
const ConnectDB = require('./config/db.confg')
// Using Routes
app.use(index)
app.use(auth)
app.use(contributor)

// Connecting DB
ConnectDB()


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running ... ${process.env.PORT || 5000}`)
})