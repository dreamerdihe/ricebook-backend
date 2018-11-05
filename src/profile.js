const Profiles = require('../model/profile')


function getHeadline(req, res) {
    const username = req.username
    console.log(username + ' request to get headline')
    Profiles.findOne({username: username}).exec((err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(401)
        }
        return res.status(200).send({"headlines": user.status})
    })
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

function getFollowingsHeadlines(res, req) {
    // Implement the function of getting current user's following headlines 
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
   app.get('/headline', isLoggedin, getHeadline)
   app.put('/headline', isLoggedin, editHeadline)
   app.get('/headlines/:Profiles?', isLoggedin, getFollowingsHeadlines)
   app.get('/email', isLoggedin, getEmail)
   app.put('/email', isLoggedin, editEmail)
   app.get('/dob', isLoggedin, getDob)
   app.put('/dob', isLoggedin, editDob)
   app.get('/zipcode', isLoggedin, getZipcode)
   app.put('/zipcode', isLoggedin, editZipcode)
   app.get('/avatars:user?', isLoggedin, getAvatar)
   app.put('/avatar', isLoggedin, editAvatar)
}
