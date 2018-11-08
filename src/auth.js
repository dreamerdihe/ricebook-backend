const md5 = require('md5')

//import mongoDB
const Session = require('../model/session')
const Users = require('../model/user')
const Profiles = require('../model/profile')

// some CONST
const cookieKey = 'sid'
const mySecretMessage = 'comp531 is very difficult'
const salt = "this is a salt"


// fix the sessionUser
function login(req, res) {
    console.log("one request for login")
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        return res.sendStatus(403)
    }
    
    Users.findOne({username: username}).exec((err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }

        if(!user) {
            return res.sendStatus(404)
        }

        const hashedPassword = md5(user.salt + password)
        if (!user || hashedPassword !== user.hashedPassword) {
            return res.sendStatus(403)
        }
        
        const sessionKey = md5(mySecretMessage + new Date().getTime() + user.username)
        
        Session.findOneAndUpdate({username: username}, {username: username, sessionId: sessionKey}, {upsert: true, new: true}, function(err, session) {
            if (err) {
            console.log(err);
            return;
            }
            res.cookie(cookieKey, session.sessionId, { maxAge: 3600*1000, httpOnly: true});
            return res.status(200).send({username: username, result: 'success'})
            });
    })
}

function logout(req, res) {
    console.log(req.username + ' request for logout')
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
    Users.findOne({username: username}).exec((err, duplicate) => {
        if (err) {
            console.log(err)
            return res.sendStatus(401)
        }

        if (duplicate) {
            return res.sendStatus(409)
        } 
        const hashedPassword = md5(salt + password)
        // restore the user into the Users database
        Users.create({username: username, salt: salt, hashedPassword: hashedPassword})
        const email = req.body.email
        const phone = req.body.phone
        const dob = req.body.dob
        const zipcode = req.body.zipcode
        Profiles.create({username: username, status: "", following: [], email: email, 
                        phone: phone, dob: dob, zipcode: zipcode, avatar: ""})
        return res.status(200).send({username: username, result: 'success'})
    })
    
}

function changePassword(req, res) {
    console.log(req.username + " request for change password")
    Users.findOne({username: req.username}).exec((err, user) =>{
        if (err) {
            console.log(err)
            return res.sendStatus(401)
        }

        const newPassword = req.body.password
        const newHashedPassword = md5(user.salt + newPassword)
        user.set({hashedPassword: newHashedPassword})
        user.save((err, user) => {
            if (err) {
                console.log(err)
                return handleError(err)
            }
            res.status(200).send({username: user.username, result:'success'})
        })
    })
}

module.exports = (app, isloggedin) => {
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', isloggedin, logout)
    app.put('/password', isloggedin, changePassword)
}
