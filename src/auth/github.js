var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var init = require('./init')

var User = require('../../model/user');
var Profile = require('../../model/profile')


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile.displayName + ' try to login by github')
    const username = profile.displayName + '@github'
    const githubUsername = profile.username

    // update the user if s/he exists or add a new user
    // the username of a github account can't duplicate
    User.findOne({'thirdParty.party': 'github', 'thirdParty.username': githubUsername}, (err, user) => {
      if(err) {
        console.log(err)
        return done(err)
      } else {
        if(user === null) {
          User.create({username: username, thirdParty: [{party: 'github', username: githubUsername}]}, (err, newUser) => {
            if(err) {
              return done(err);
            } else {
              const status = 'Welcome, github user! Post something new here!'
              Profile.create({username: username, status: status, following: [], email: profile.emails[0].value, phone: '', dob: '', zipcode: '', avatar: ''}, (err, profile) => {
                return done(null, newUser);
              })
            }
          })
        } else {
          return done(null, user);
        }
      }
    });
  }
));

// serialize user into the session
init();


module.exports = passport;