const fs = require('fs')
const md5 = require('md5')
const Session = require('../model/session')
const Users = require('../model/user')
const cookieKey = 'sid'
const mySecretMessage = 'comp531 is very difficult'
const salt = "this is a salt"


// fix the sessionUser
function login(req, res) {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        return res.status(401).send(false)
    }

    Users.findOne({username: username}, (err, user) => {
        if (err) {
            console.log(err)
            return
        }

        console.log(user)
        const hashedPassword = md5(user.salt + password)
        if (!user || hashedPassword !== user.hashedPassword) {
            return res.status(401),send(false)
        }
        
        const sessionKey = md5(mySecretMessage + new Date().getTime() + user.username)

        Session.create({sessionId: sessionKey}, function(err, session) {
            if (err) {
            console.log(err);
            return;
            }
            res.cookie(cookieKey, session.sessionId, { maxAge: 3600*1000, httpOnly: true});
            res.status(200).send({username: username, result: 'success'})
            });
    })

    return 
}

function logout(req, res) {
    console.log('request for logout')
    const sid = req.cookies[cookieKey]
    res.clearCookie(cookieKey)
    if (sid) {
        Session.findOneAndDelete({sessionId: sid}, function(err) {
            if(err) {
                console.log(err)
                return
            }
            res.clearCookie(cookieKey)
            res.send({"status":"OK"})
        })        
    }
}

function register(req, res) {
    console.log("one request for regiseration")
    const username = req.body.username
    const password = req.body.password
    // if the username and password is invalid
    console.log(username, password)
    if (!username || !password) {
        return res.sendStatus(401)
    }
    // if the username dupilcates
    const duplicate = getUser(username)
    if (duplicate) {
        return res.send({"result": "username duplicate"})
    }
    // restore the user into the Users database
    const hashedPassword = md5(salt + password)
    Users.create({username: username, salt: salt, hashedPassword: hashedPassword})
    return res.sendStatus(200)
}

function changePassword(req, res) {
    // Implement the function of changePassword
}

module.exports = (app, isloggedin) => {
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', isloggedin, logout)
    app.put('/password', isloggedin, changePassword)
}
