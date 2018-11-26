require('dotenv').config();

// import packages
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
// const seedDB = require('./test/seed')

// import routers
const auth = require('./src/auth/auth').auth
const isLoggedin = require('./src/auth/auth').isLoggedin
const articles = require('./src/articles')
const profile = require('./src/profile')
const following = require('./src/following')

// connect to mongoose
mongoose.connect(process.env.MONGOLAB_URL, { useNewUrlParser: true });

// build my app
const app = express()
app.use(cookieParser())
app.enable('trust proxy');

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json())
app.use(enableCORS)


// set up router
// seedDB()
auth(app, isLoggedin)
articles(app, isLoggedin)
profile(app, isLoggedin)
following(app, isLoggedin)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000

function enableCORS(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    // res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers','Authorization, Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id')
    next();
  }

const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})