const Posts = require('../model/post')
const Profiles = require('../model/profile')
const mongoose = require('mongoose')

function getArticle(req, res) {
    // Implement the function of getting articles
    const id = req.params.id
    if (!id) {
        console.log("one request for getting feed")
        Profiles.findOne({username: req.username}, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            Posts.find().where('author.username').equals(user.username).exec((err, posts) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404) 
                }
                if (user.following) {
                    Posts.find().where('author.id').equals({$in: user.following }).exec(
                        (err, posts1) => {
                         if (err) {
                             console.log(err)
                             return res.sendStatus(404)
                         }
                         posts.concat(posts1)
                     })
                     return res.send({articles: posts})
                 }
                 return res.send({articles: posts})
            })
        })
    } else {
        if(mongoose.Types.ObjectId.isValid(id)) {
            Posts.findById(id, (err, post) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }
                if (post) {
                    console.log("one request for getting post by post id")
                    return res.send({articles: post})
                } else {
                    console.log("one request for getting post by user id")
                    Profiles.findById(id, (err, user) => {
                        if (err) {
                            console.log(err)
                            return res.sendStatus(404)
                        }
                        if (!user) {
                            return res.sendStatus(404)
                        } else {
                            Posts.find().where('author.username').equals(user.username).exec((err, posts) => {
                                if (err) {
                                    console.log(err)
                                return res.sendStatus(404)
                                }
                                return res.send({articles: posts})
                            })
                        }
                    })
                }
            })
        } else {
            return res.send({"result": "invalid id"})
        }
    }
}

function editArticle(req, res) {
    // Implement the function of editting a specific articles
}

function postArticle(req, res) {
    // Implement the function of posting an article
}

module.exports = (app, isloggedin) => {
   app.get('/articles/:id?', isloggedin, getArticle)
   app.put('/articles/:id', isloggedin, editArticle)
   app.post('/article', isloggedin, postArticle)
}
