const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

// const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.use(enableCORS)
app.post('/login', login)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000

function enableCORS(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next();
  }

function login(req, res) {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        res.sendStatus(401)
        return
    }
    const user = getUser(username)
    if (!user || password !== user.password) {
        res.sendStatus(401)
        return
    }

    res.send({isAuthorized: true, user: user})
    return

    // const users = JSON.parse(fs.readFileSync("./asset/profile.json"))
    // for (let i = 0; i < users.length; i++) {
    //     if (username === users[i].accountName && password === users[i].password) {

    //         res.send({isAuthorized: true, user: users[i]})
    //         return
    //     } else {
    //         res.send({isAuthorized: false})
    //         return
    //     }
    // }
}

function getUser(username) {
    const users = JSON.parse(fs.readFileSync("./asset/profile.json"))
    for (let i = 0; i < users.length; i++) {
        if (username === users[i].accountName) {
            return users[i]
        }
    }
}

const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})