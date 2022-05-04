const express = require('express')
const app = express()
const PORT = process.env.PORT || 5050

app.use(express.json())
app.use(express.urlencoded({extended:false}))


// Routes
const index = require('./src/routes/index.routes')
const auth = require('./src/routes/auth.routes')
const contributor = require('./src/routes/contributor.routes')
// Using Routes
app.use(index)
app.use(auth)
app.use(contributor)


app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`)
})