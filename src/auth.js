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
    
    getUser(username).then(user => {
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
            return res.status(200).send({username: username, result: 'success'})
            });
    }).catch(err => {
        console.log(err)
        return
    })
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
    if (!username || !password) {
        return res.sendStatus(401)
    }
    // if the username dupilcates
    getUser(username)
    .then((duplicate) => {
        if (duplicate) {
            return res.send({"result": "username duplicate"})
        } 
        const hashedPassword = md5(salt + password)
        // restore the user into the Users database
        Users.create({username: username, salt: salt, hashedPassword: hashedPassword})
        return res.sendStatus(200)
    }).catch(err => {
        console.log(err)
        return
    })
    
}

function changePassword(req, res) {
    // Implement the function of changePassword
}

getUser = function(username) {
    return Users.findOne({username: username}).exec()
}

module.exports = (app, isloggedin) => {
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', isloggedin, logout)
    app.put('/password', isloggedin, changePassword)
}
