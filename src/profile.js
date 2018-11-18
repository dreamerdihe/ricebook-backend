const Profiles = require('../model/profile')
const mongoose = require('mongoose')
const uploadImage = require('../uploadCloudinary')

function search(req, res) {
    console.log('one request for search someone')
    const target = req.body.searchFor
    if(!target) {
        return res.sendStatus(403)
    }

    Profiles.findOne({username: target}, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(401)
        }
        if (!user) {
            return res.send({result: "no user"})
        }
        return res.send({user: user, result: "success"})
    })
}

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
            return res.status(200).send({"username": user.username, "headline": user.status})
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
                return res.status(200).send({"headlines": headlines})
            })
        }
    }
}

function editHeadline(req, res) {
    const username = req.username
    const newHeadline = req.body.headline
    console.log(username + ' request to edit headline')
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

function getEmail(req, res) {
    // Implement the function of getting current user's email
    const id = req.params.user
    if (id) {
        console.log("one request fot getting a specific email")
        if(mongoose.Types.ObjectId.isValid(id)) {
            Profiles.findById(id, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }
                return res.send({username: user.username, email: user.email})
            })
        }
    } else {
        console.log("one request fot getting his email")
        Profiles.findOne({username: req.username}, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            return res.send({username: user.username, email: user.email})
        })
    }
}

function editEmail(req, res) {
    // Implement the function of editting current user's email
    const newEmail = req.body.email
    console.log("one requset for updating his email")
    Profiles.findOneAndUpdate({username: req.username}, {$set: {email: newEmail}}, {new: true}, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(404)
        }
        return res.send({username: req.username, email: user.email})
    })
}

function getPhone(req, res) {
    // Implement the function of getting current user's phone
    const id = req.params.user
    if (id) {
        console.log("one request fot getting a specific phone")
        if(mongoose.Types.ObjectId.isValid(id)) {
            Profiles.findById(id, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }
                return res.send({username: user.username, phone: user.phone})
            })
        }
    } else {
        console.log("one request fot getting his email")
        Profiles.findOne({username: req.username}, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            return res.send({username: user.username, phone: user.phone})
        })
    }
}

function editPhone(req, res) {
    // Implement the function of editting current user's phone
    const newPhone = req.body.phone
    console.log("one requset for updating his phone")
    Profiles.findOneAndUpdate({username: req.username}, {$set: {phone: newPhone}}, {new: true}, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(404)
        }
        return res.send({username: req.username, phone: user.phone})
    })
}

function getDob(req, res) {
    // Implement the function of getting current user's date of birthday
    const id = req.params.user
    if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            Profiles.findById(id, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }
                if (!user) {
                    return res.sendStatus(404)
                }
                const dob = Date.parse(user.dob)
                return res.send({username: user.username, dob: dob})
            })
        } else {
            return res.sendStatus(404)
        }
    } else {
        Profiles.findOne({username: req.username}, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            const dob = Date.parse(user.dob)
            return res.send({username: req.username, dob: dob})
        })
    }
}

function getZipcode(req, res) {
    // Implement the function of getting current user's zipcode
    const id = req.params.user
    if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            console.log("one request fot getting a specific zipcode")
            Profiles.findById(id, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }
                if (!user) {
                    return res.sendStatus(404)
                }
                return res.send({username: user.username, zipcode: user.zipcode})
            })
        } else {
            return res.sendStatus(404)
        }
    } else {
        console.log("one request fot getting a specific zipcode")
        Profiles.findOne({username: req.username}, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            return res.send({username: req.username, zipcode: user.zipcode})
        })
    }
}

function editZipcode(req, res) {
    // Implement the function of editting current user's zipcode
    const newZipcode = req.body.zipcode
    console.log("one requset for updating his zipcode")
    Profiles.findOneAndUpdate({username: req.username}, {$set: {zipcode: newZipcode}}, {new: true}, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(404)
        }
        return res.send({username: req.username, zipcode: user.zipcode})
    })
}

function getAvatar(req, res) {
    // Implement the function of getting current user's avater
    const username = req.username
    let id = req.params.user
    // if not specify the users, get the current user's headline
    if (!id) {
        console.log(username + ' request to get his avatar')
        Profiles.findOne({username: username}).exec((err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(401)
            }
            return res.status(200).send({"avatar": user.avatar})
        })
    } else {
        console.log(username + ' request to get some specific avatar')
        let ids = id.split(',')
        ids = ids.filter(id => mongoose.Types.ObjectId.isValid(id))
        // no valid user id in the request
        if (ids.length === 0) {
            console.log("no valid user id")
            return res.send({"avatar": []})
        } else {
            Profiles.find({_id: {$in: ids}}, (err, users) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(401)
                }
                // if can't find the user
                if (users.length === 0) {
                    console.log("can't find these users")
                    return res.send({"avatar": []})
                }
                const avatar = users.map((user) => ({ "username": user.username, "avatar": user.avatar}))
                return res.status(200).send({"avatar": avatar})
            })
        }
    }
}

function editAvatar(req, res) {
    // Implement the function of editting current user's avater
    const newAvatar = req.fileurl;
    console.log("one requset for updating his avatar")
    Profiles.findOneAndUpdate({username: req.username}, {$set: {avatar: newAvatar}}, {new: true}, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(404)
        }
        return res.send({username: req.username, avatar: user.avatar})
    })
}

module.exports = (app, isLoggedin) => {
    app.post('/search', isLoggedin, search)    
    app.get('/headline/:users?', isLoggedin, getHeadline)
    app.put('/headline', isLoggedin, editHeadline)
    app.get('/email/:user?', isLoggedin, getEmail)
    app.put('/email', isLoggedin, editEmail)
    app.get('/phone/:user?', isLoggedin, getPhone)
    app.put('/phone', isLoggedin, editPhone)
    app.get('/dob/:user?', isLoggedin, getDob)
    app.get('/zipcode/:user?', isLoggedin, getZipcode)
    app.put('/zipcode', isLoggedin, editZipcode)
    app.get('/avatars/:user?', isLoggedin, getAvatar)
    app.put('/avatar', isLoggedin, uploadImage('avatar'), editAvatar)
}