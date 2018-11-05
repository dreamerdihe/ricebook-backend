const Users = require("../model/user")
const Session = require("../model/session")
const Profiles = require("../model/profile")
const Posts = require('../model/post')
const Comments = require('../model/comment')

const UsersData = [
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

const ProfilesData = [
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

const PostsData = [
  {
    body: "Nam tincidunt lacus sit amet leo vehicula, ac commodo elit molestie. Vivamus placerat felis eget diam vestibulum, at interdum enim pulvinar. ",
    picture: "https://i.gadgets360cdn.com/large/spider-man-ps4_1535098864166.jpg",
  },
  {
    body: "Nulla laoreet diam nec tempus bibendum. Quisque pulvinar luctus imperdiet. Morbi eu aliquet massa.",
    picture: "https://communityimpact.com/wp-content/uploads/2018/04/Houston-skyline.jpg",
  },
  {
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.",
    picture: "https://oir.rice.edu/sites/g/files/bxs1496/f/styles/image_16_9__1920x1080_/public/heroslides/lovett-backdrop-crop.jpg?itok=bXLrGPQf",
  },
  {
    body:  "Sed ultrices venenatis dolor nec tincidunt. Praesent pellentesque arcu arcu, at porttitor sem ornare ut. Nulla laoreet diam nec tempus bibendum.",
    picture: "https://www.freevector.com/uploads/vector/preview/1485/FreeVector-Apple-Devices-Vector.jpg",
  },
  {
    body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
    picture: "https://i.gadgets360cdn.com/large/spider-man-ps4_1535098864166.jpg",
  }
]

function seedDB() {
  Users.deleteMany({}, (err) => {
    if (err) { return console.log(err) }

    Session.deleteMany({}, (err) => {
      if (err) { return console.log(err) }

      Profiles.deleteMany({}, (err) => {
        console.log("All Userss, Sessions, Profiless Removed!")

        UsersData.forEach(function(UserData, i) {
          Users.create(UserData, (err, User) => {
            if(err) { return console.log(err) }

            console.log("New Users added!")
            
            ProfileData = ProfilesData[i]
            Profiles.create(ProfileData, (err, Profile) => {
              if(err) { return console.log(err) }
              
              console.log("New Profiles added!")
              PostsData.forEach((Postdata, j) => {
                Posts.create({author: UserData.username, body: Postdata.body, picture: Postdata.body, comments: []}, (err, post) => {
                  for (let i = 0; i < 2; i++) {
                    const body = "this is " + i + " comment of the " + UserData.username + "'s " + j + " post"
                    Comments.create({author: UserData.username, body: body}, (err, comment) => {
                      if (err) { return console.log(err) }
                      post.comments.push(comment._id)
                    })
                  }
                  post.save()
                })
              })
            })
          })
        })
      })
    })
  })
}

module.exports = seedDB
