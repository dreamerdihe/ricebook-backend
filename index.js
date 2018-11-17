require('dotenv').config();

// import packages
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const Session = require('./model/session')
const seedDB = require('./test/seed')

// import routers
const auth = require('./src/auth').auth
const isLoggedin = require('./src/auth').isLoggedin
const articles = require('./src/articles')
const profile = require('./src/profile')
const following = require('./src/following')

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// build my app
const app = express()

const cookieKey = 'sid'
app.use(cookieParser())
app.use(bodyParser.json())
app.use(enableCORS)
// require('./uploadCloudinary.js').setup(app)

// set up router
seedDB()
auth(app, isLoggedin)
articles(app, isLoggedin)
profile(app, isLoggedin)
following(app, isLoggedin)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000

function enableCORS(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type')
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id')
    next();
  }

const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})