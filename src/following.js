function getFollowing(res, req) {
    // Implement the function of get the current user's followings
}

function addFollowing(res, req) {
    // Implement the function of add a following
}

function deleteFollowing(res, req) {
    // Implement the function of delete a following
}

module.exports = (app, isLoggedin) => {
    app.get('/following/:user?', isLoggedin, getFollowing)
    app.put('/following/:user', isLoggedin, addFollowing)
    app.delete('/following/:user', isLoggedin, deleteFollowing)
}