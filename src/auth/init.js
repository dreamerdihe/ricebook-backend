var passport = require('passport');
var User = require('../../model/user')


module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  });
};