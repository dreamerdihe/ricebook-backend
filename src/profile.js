const Profiles = require('../model/profile')
const mongoose = require('mongoose')


function getHeadline(req, res) {
    const username = req.username
    let users = req.params.users
    // if not specify the users, get the current user's headline
    if (!users) {
        console.log(username + ' request to get his headline')
        Profiles.findOne({username: username}).exec((err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(401)
            }
            return res.status(200).send({"headline": user.status})
        })
    } else {
        console.log(username + ' request to get some specific headlines')
        users = users.split(',')
        users = users.filter(user => mongoose.Types.ObjectId.isValid(user))
        // no valid user id in the request
        if (users.length === 0) {
            console.log("no valid user id")
            return res.send({"headlines": []})
        } else {
            Profiles.find({_id: {$in: users}}, (err, users) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(401)
                }
                // if can't find the user
                if (users.length === 0) {
                    console.log("can't find these users")
                    return res.send({"headlines": []})
                }
                const headlines = users.map((user) => ({ "username": user["username"], "headline": user["status"]}))
                console.log(headlines)
                return res.status(200).send({"headlines": headlines})
            })
        }
    }
}

function editHeadline(req, res) {
    const username = req.username
    const newHeadline = req.body.headline
    console.log(username + ' request to edit headline to ' + newHeadline)
    Profiles.findOne({username: username}).exec((err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(401)
        }

        user.set({status: newHeadline})
        user.save((err, user) => {
            if (err) {
                console.log(err)
                return handleError(err)
            }
            res.status(200).send({"username": user.username, "headline": user.status})
        })
    })
}

function getEmail(res, req) {
    // Implement the function of getting current user's email
}

function editEmail(res, req) {
    // Implement the function of editting current user's email
}

function getDob(res, req) {
    // Implement the function of getting current user's date of birthday
}

function editDob(res, req) {
    // Implement the function of editting current user's date of birthday
}

function getZipcode(res, req) {
    // Implement the function of getting current user's zipcode
}

function editZipcode(res, req) {
    // Implement the function of editting current user's zipcode
}

function getAvatar(res, req) {
    // Implement the function of getting current user's avater
}

function editAvatar(res, req) {
    // Implement the function of editting current user's avater
}

module.exports = (app, isLoggedin) => {
   app.get('/headline/:users?', isLoggedin, getHeadline)
   app.put('/headline', isLoggedin, editHeadline)
   app.get('/email', isLoggedin, getEmail)
   app.put('/email', isLoggedin, editEmail)
   app.get('/dob', isLoggedin, getDob)
   app.put('/dob', isLoggedin, editDob)
   app.get('/zipcode', isLoggedin, getZipcode)
   app.put('/zipcode', isLoggedin, editZipcode)
   app.get('/avatars:user?', isLoggedin, getAvatar)
   app.put('/avatar', isLoggedin, editAvatar)
}