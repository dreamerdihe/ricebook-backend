const fs = require('fs')
const md5 = require('md5')
const Session = require('../model/session')
const cookieKey = 'sid'
const mySecretMessage = 'comp531 is very difficult'


// fix the sessionUser
function login(req, res) {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        return res.status(401).send(false)
    }
    const user = getUser(username)
    if (!user || password !== user.password) {
        return res.status(401),send(false)
    }
    
    const sessionKey = md5(mySecretMessage + new Date().getTime() + user.username)

    Session.create({sessionId: sessionKey}, function(err, session) {
        if (err) {
        console.log(err);
        return;
        }
        res.cookie(cookieKey, session.sessionId, { maxAge: 3600*1000, httpOnly: true});
        res.status(200).send({user: user, result: 'success'})
        });
    
    return 
}

function testCookie(res, req) {
    console.log(req)
}

function getUser(username) {
    const users = JSON.parse(fs.readFileSync("./asset/profile.json"))
    for (let i = 0; i < users.length; i++) {
        if (username === users[i].accountName) {
            return users[i]
        }
    }
}

function logout(req, res) {
    console.log('request for logout')
    console.log('headers: ', req.cookies)
    const sid = req.cookies[cookieKey]
    res.clearCookie(cookieKey)
    if (sid) {
        Session.findOneAndDelete({sessionId: sid}, function(err) {
            if(err) {
                console.log(err)
                return
            }
            res.clearCookie(cookieKey)
            res.send("OK")
        })        
    }
}

function register(req, res) {
    // Implement the function of register
}

function changePassword(req, res) {
    // Implement the function of changePassword
}

module.exports = (app, isloggedin) => {
    app.post('/login', login)
    app.get('/login', testCookie)
    app.post('/register', register)
    app.put('/logout', isloggedin, logout)
    app.put('/password', isloggedin, changePassword)
}
