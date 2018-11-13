const Posts = require('../model/post')
const Profiles = require('../model/profile')
const Comments = require('../model/comment')
const mongoose = require('mongoose')


// Implement the function of getting articles
function getArticle(req, res) {
    const id = req.params.id
    if (!id) {
        console.log("one request for getting feed")
        Profiles.findOne({username: req.username}, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            let target = [user._id]
            
            target = target.concat(user.following)
            Posts.find().where('author.id').equals({$in: target}).sort({date: -1}).populate("comments").exec((err, posts) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }
                return res.send({articles: posts})
            })
        })
    } else {
        // check whether the id is valid
        if(mongoose.Types.ObjectId.isValid(id)) {
            Posts.findById(id, (err, post) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }
                // first assume the id is a post id
                if (post) {
                    console.log("one request for getting post by post id")
                    return res.send({articles: post})
                } else {
                    // if it is not a post id, we assume it is a user id
                    console.log("one request for getting post by user id")
                    Profiles.findById(id, (err, user) => {
                        if (err) {
                            console.log(err)
                            return res.sendStatus(404)
                        }
                        // if we can't find the user, we response an empty array
                        if (!user) {
                            return res.send({"articles": []})
                        } else {
                            Posts.find().where('author.username').equals(user.username).populate("comments").exec((err, posts) => {
                                if (err) {
                                    console.log(err)
                                return res.sendStatus(404)
                                }
                                return res.send({"articles": posts})
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

// Implement the function of editting a specific articles
function editArticle(req, res) {
    const username = req.username
    const id = req.params.id
    const text = req.body.text
    const commentId = req.body.commentId
    console.log(commentId)

    if (!commentId) {
        // edit the article
        console.log(username +  " request for eidt his post")
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404)
        }

        Posts.findById(id, (err, post) => {
            if (err) {
                console.log(err)
                return res.sendStatus(404)
            }
            if (post.author.username !== username) {
                return res.sendStatus(401)
            }

            post.body = text
            post.save()
            Profiles.findOne({username: username}, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }

                let target = [user._id]
                target = target.concat(user.following)
                Posts.find().where('author.id').equals({$in: target}).sort({date: -1}).populate("comments").exec((err, posts) => {
                    if (err) {
                        console.log(err)
                        return res.sendStatus(404)
                    }
                    return res.send({articles: posts})
                })
            })
        })
    } else {
        // edit the comment
        if (commentId === '-1') {
            console.log(username + " request for adding a comment")
            // add the comment
            Posts.findById(id, (err, post) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }

                Comments.create({author: username, body: text}, (err, comment) => {
                    if (err) {
                        console.log(err)
                        return res.sendStatus(404)
                    }
                    post.comments.push(comment.id)
                    post.save()

                    Profiles.findOne({username: req.username}, (err, user) => {
                        if (err) {
                            console.log(err)
                            return res.sendStatus(404)
                        }
                        let target = [user._id]
                        target = target.concat(user.following)
            
                        Posts.find().where('author.id').equals({$in: target}).sort({date: -1}).populate("comments").exec((err, posts) => {
                            if (err) {
                                console.log(err)
                                return res.sendStatus(404)
                            }
                            return res.send({articles: posts})
                        })
                    })
                })
            }) 
        } else {
            // edit the comment
            console.log(username + " request for editting his comment")
            Comments.findById(commentId, (err, comment) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }

                if (comment.author === username) {
                    // own the comment
                    comment.body = text
                    comment.data = Date.now()
                    comment.save()
                    Profiles.findOne({username: username}, (err, user) => {
                        if (err) {
                            console.log(err)
                            return res.sendStatus(404)
                        }
        
                        let target = [user._id]
                        target = target.concat(user.following)
                        
                        Posts.find().where('author.id').equals({$in: target}).sort({date: -1}).populate("comments").exec((err, posts) => {
                            if (err) {
                                console.log(err)
                                return res.sendStatus(404)
                            }
                            return res.send({articles: posts})
                        })
                    })
                }
            })
        }
    }
}

// Implement the function of posting an article
function postArticle(req, res) {
    console.log(req.username + " requst for post article")
    const text = req.body.text
    Profiles.findOne({username: req.username}, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(404).send({'result': 'err'})
        }
        const author = {id: user.id, username: req.username}
        Posts.create({author: author, body: text, comments: []}, (err, post) => {
            if (err) {
                console.log(err)
                return res.status(404).send({'result': 'err'})
            }

            let target = [user._id]
            target = target.concat(user.following)

            Posts.find().where('author.id').equals({$in: target}).sort({date: -1}).populate("comments").exec((err, posts) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(404)
                }

                return res.send({articles: posts})
            })
        })
    })
}

module.exports = (app, isloggedin) => {
   app.get('/articles/:id?', isloggedin, getArticle)
   app.put('/articles/:id', isloggedin, editArticle)
   app.post('/article', isloggedin, postArticle)
}
