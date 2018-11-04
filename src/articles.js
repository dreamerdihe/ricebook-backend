const fs = require('fs')

function getArticle(res, req) {
    // Implement the function of getting articles
}

function editArticle(res, req) {
    // Implement the function of editting a specific articles
}

function postArticle(res, req) {
    // Implement the function of posting an article
}

module.exports = (app, isloggedin) => {
   app.get('/articles/:id?', isloggedin, getArticle)
   app.put('/articles/:id', isloggedin, editArticle)
   app.post('/article', isloggedin, postArticle)
}
