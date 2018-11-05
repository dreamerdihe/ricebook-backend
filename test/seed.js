var Users = require("../model/user")
var Session = require("../model/session")
var Profiles = require("../model/profile")


var UsersData = [
  {
    username: "rice",
    salt: "this is a salt",
    hashedPassword: "bc52adaffc912d02eef0b8b11353f34a"
  }, 
  {
    username: "yuan", 
    salt: "this is a salt",
    hashedPassword: "9f910ba733ac99b9db73b838c86fcc0c"
  },
]

var ProfilessData = [
  {
    accountName: "rice",
    status: "Here is ricebook",
    following: [],
    email: "loverice@rice.edu",
    phone: "123-456-7890",
    dob: "1995-10-15",
    zipcode: "77005",
    avatar: "https://i.ytimg.com/vi/haoytTpv2NU/maxresdefault.jpg"
  }, 
  {
    accountName: "yuan",
    status: "Here is YuanHE",
    following: [],
    email: "yuan@rice.edu",
    phone: "666-666-6666",
    dob: "1995-10-15",
    zipcode: "77005",
    avatar: "https://riceowls.com/images/2017/5/1/rice-full-owl.jpg"
  }
]

function seedDB() {
  Users.deleteMany({}, function(err) {
    if (err) {
      console.log(err)
      return
    }
    Session.deleteMany({}, function(err) {
      if (err) {
        console.log(err)
        return
      }
      Profiles.deleteMany({}, function(err) {
        console.log("All Userss, Sessions, Profiless Removed! ")
        UsersData.forEach(function(UserData, i) {
          Users.create(UserData, function(err, User) {
            if(err) {
              console.log(err)
              return
            }
            console.log("New Users added! ")
            ProfilesData = ProfilessData[i]
            Profiles.create(ProfilesData, function(err, Profile) {
              if(err) {
                console.log(err)
                return
              }
              console.log("New Profiles added! ")
            })
          })
        })
      })
    })
  })
}

module.exports = seedDB
