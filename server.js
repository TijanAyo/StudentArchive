require("dotenv").config()

const express = require('express')
const app = express()
const session = require('express-session');
const flash = require('connect-flash');

app.set('view engine', 'ejs')

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
//use flash
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
    next();
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public'))


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