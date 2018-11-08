const Profiles = require('../model/profile')
const mongoose = require('mongoose')


function getFollowing(req, res) {
    // Implement the function of get the current user's followings
    const username = req.username
    let id = req.params.user
    // if not specify the users, get the current user's headline
    if (!id) {
        console.log(username + ' request to get his following')
        Profiles.findOne({username: username}).exec((err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            return res.status(200).send({username: user.username, following: user.following})
        })
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(401).send("invalid user")
        }
        console.log(username + ' request to get some specific headlines')
        Profiles.findById(id).exec((err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            if (!user) {
                return res.sendStatus(404)
            }
            // if can't find the user
            return res.status(200).send({username: user.username, following: user.following})
        })
    }
}

function addFollowing(req, res) {
    // Implement the function of add a following
    const username = req.username
    let id = req.params.user
    console.log(username + ' request to add one to his following')
    Profiles.findOne({username: req.username}, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(404)
        }

        if (user.following.includes(id)) {
            return res.status(200).send({result: "duplicate"})
        }

        Profiles.findOne({username: username}, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            user.following.push(id)
            user.save()
            return res.status(200).send({username: user.username, following: user.following})
        })
    })
}

function deleteFollowing(req, res) {
    // Implement the function of delete a following
    const username = req.username
    let id = req.params.user
    console.log(username + ' request to remove one to his following')
    Profiles.findOne({username: username}, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(404)
        }
        user.following = user.following.filter((fol) => fol != id)
        user.save()
        return res.status(200).send({username: user.username, following: user.following})
    })
}

module.exports = (app, isLoggedin) => {
    app.get('/following/:user?', isLoggedin, getFollowing)
    app.put('/following/:user', isLoggedin, addFollowing)
    app.delete('/following/:user', isLoggedin, deleteFollowing)
}