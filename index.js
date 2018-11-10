require('dotenv').config();

// import packages
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const Session = require('../backend/model/session')
const seedDB = require('./test/seed')

// import routers
const auth = require('./src/auth')
const articles = require('./src/articles')
const profile = require('./src/profile')
const following = require('./src/following')

// connect to mongoose

// const dataBaseUrl = "mongodb://ricebook:ricebook6@ds133281.mlab.com:33281/ricebook"
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

// build my app
const app = express()


const cookieKey = 'sid'
app.use(cookieParser())
app.use(bodyParser.json())
app.use(enableCORS)

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

function isLoggedin(req, res, next) {
    var sid = req.cookies[cookieKey]
    if (!sid) {
        console.log('one try to invade in')
        return res.sendStatus(401)
    }
    // var username = sessionUser[sid]

    Session.findOne({sessionId: sid}, function(err, sessionUser) {
        if (err) {
            console.log(err)
            return res.sendStatus(401)
        }
        if(sessionUser != null) {
            req.username = sessionUser.username
            return next();
        } else {
            console.log('one try to invade in')
            return res.sendStatus(401)
        }
    })
}

const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})