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
  {
    username: "mengxiao", 
    salt: "this is a salt",
    hashedPassword: "9f910ba733ac99b9db73b838c86fcc0c"
  },
  {
    username: "messi",
    salt: "this is a salt",
    hashedPassword: "7025d57623683b3e9d78eab5d83f1659"
  },
  {
    username: "sysu",
    salt: "this is a salt",
    hashedPassword: "7cad3279a74bf3916374a9b6c02e830d"
  }
]

const ProfilesData = [
  {
    username: "rice",
    status: "Here is ricebook",
    following: [],
    email: "loverice@rice.edu",
    phone: "123-456-7890",
    dob: "1995-10-15",
    zipcode: "77005",
    avatar: "https://i.ytimg.com/vi/haoytTpv2NU/maxresdefault.jpg"
  }, 
  {
    username: "yuan",
    status: "Here is YuanHE",
    following: [],
    email: "yuan@rice.edu",
    phone: "666-666-6666",
    dob: "1995-10-15",
    zipcode: "77005",
    avatar: "https://pbs.twimg.com/profile_images/710858124274606080/DXJZdE76_400x400.jpg"
  },
  {
    username: "mengxiao",
    status: "London is a beautiful place",
    email:  "mengxiao@sysu.edu",
    phone: "123-337-1234",
    dob: "1996-11-19",
    zipcode: "77005",
    avatar: "https://s.aolcdn.com/hss/storage/midas/e772d29f279be5980fe05aedffe585b1/205385868/Spider-Man++Homecoming+VR+Key+Art+copy.jpg"
  },
  {
    username: "messi",
    status: "best soccor player",
    email: "123@qwe.ed",
    phone: "123-456-7890",
    dob: "1979-06-12",
    zipcode: "12345",
    avatar: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fpeopledotcom.files.wordpress.com%2F2016%2F08%2Flionel-messi-800.jpg%3Fw%3D800&w=700&c=sc&poi=face&q=85"
  },
  {
    username: "sysu",
    status: "Sun Yat-sen University",
    email: "sysu@sysu.edu",
    phone: "123-456-7890",
    dob: "1979-06-12",
    zipcode: "66666",
    avatar: "http://international.iupui.edu/img/partnerships-initiatives/sysulogo-square.jpg"
  }
]

const PostsData = [
  [
      {
          "body": "Nam ut orci at lectus ullamcorper elementum id eget sem.",
          "picture": "https://i.gadgets360cdn.com/large/spider-man-ps4_1535098864166.jpg"
      },
      {
          "body": "Integer cursus augue blandit, congue lectus at, facilisis diam.",
          "picture": "https://communityimpact.com/wp-content/uploads/2018/04/Houston-skyline.jpg"
      },
      {
          "body": "Morbi vitae massa lacinia, dictum sem eu, congue metus.",
          "picture": "https://oir.rice.edu/sites/g/files/bxs1496/f/styles/image_16_9__1920x1080_/public/heroslides/lovett-backdrop-crop.jpg?itok=bXLrGPQf"
      },
      {
          "body":  "Nam gravida enim ut ex tristique, quis scelerisque risus condimentum.",
          "picture": "https://www.freevector.com/uploads/vector/preview/1485/FreeVector-Apple-Devices-Vector.jpg"
      },
      {
          "body": "Morbi sodales ante et lorem pellentesque tempus.",
          "picture": "https://www.trollfootball.me/upload/full/2015/08/22/kv.jpg"
}
  ],
  [
      {
          "body": "Cras egestas elit a lobortis laoreet. ",
          "picture": "https://metrouk2.files.wordpress.com/2018/11/marvel-41af.jpg?quality=90&strip=all&zoom=1&resize=644%2C362"
      },
      {
          "body": "Quisque facilisis tortor in risus venenatis, non porttitor odio pulvinar.",
          "picture": "https://media.comicbook.com/2017/12/marvel-2017-comicbookcom-1070526-1280x0.jpeg"
      },
      {
          "body": "Duis blandit lectus id ultricies faucibus.",
          "picture": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/marvelsspider-man_lob_crd_02.jpg"
      },
      {
          "body":  "Aliquam consequat lacus quis magna vehicula dapibus quis non purus.",
          "picture": "https://filmschoolrejects.com/wp-content/uploads/2016/05/update-the-lists-marvel-movies-ranked.jpg"
      },
      {
          "body": "Vestibulum ac nibh suscipit, tempor odio in, tincidunt sem.",
          "picture": "http://cultbox.co.uk/wp-content/uploads/2018/03/The-Vision-Paul-Bettany-Avengers-Infinity-War.jpg"
}
  ],
  [
      {
          "body": "Phasellus et dolor a neque convallis eleifend ac a nulla.",
          "picture": "https://hbr.org/resources/images/article_assets/2018/04/apr18-20-nasa-apollo-proj-archive-01.jpg"
      },
      {
          "body": "Nulla laoreet diam nec tempus bibendum. Quisque pulvinar luctus imperdiet. Morbi eu aliquet massa.",
          "picture": "https://assets3.thrillist.com/v1/image/2690859/size/sk-2017_04_article_main_mobile.jpg"
      },
      {
          "body": "Fusce egestas arcu maximus mi mollis scelerisque at sed ligula.",
          "picture": "https://ichef.bbci.co.uk/news/976/cpsprodpb/71B2/production/_93160192_iss-3-south-china-sea.jpg"
      },
      {
          "body":  "Fusce porttitor purus a nunc finibus, eu tempus ante tincidunt.",
          "picture": "https://c1.staticflickr.com/9/8677/16577125079_55fe364a57_b.jpg"
      },
      {
          "body": "Vivamus consequat metus in mauris dictum fermentum.",
          "picture": "https://cdnbr1.img.sputniknews.com/images/932/43/9324348.jpg"
}
  ],
  [
      {
          "body": "Morbi tincidunt dui et ipsum suscipit vehicula.",
          "picture": "https://www.economist.com/sites/default/files/20170513_FNP502_facebook.jpg"
      },
      {
          "body": "Nulla laoreet diam nec tempus bibendum. Quisque pulvinar luctus imperdiet. Morbi eu aliquet massa.",
          "picture": "https://www.nationalgeographic.com/content/dam/travel/2017-digital/21-unesco-sites-china/great-wall-unesco-china.ngsversion.1527084020702.adapt.1900.1.jpg"
      },
      {
          "body": "Cras tristique nunc ultrices tellus aliquam ornare.",
          "picture": "https://c1.staticflickr.com/8/7555/16005112960_6a4632d409_b.jpg"
      },
      {
          "body":  "Duis non mi accumsan, tempor lorem sollicitudin, iaculis sapien.",
          "picture": "http://images.dailyhive.com/20180122155106/shenzhen-china.jpg"
      },
      {
          "body": "Quisque et nisl cursus, iaculis augue vel, volutpat libero.",
          "picture": "https://drwyjmricaxm7.cloudfront.net/repository/Xian-city-walls--China-Highlight--On-the-Go-Tours-288661456840563_crop_960_390.jpg"
}
  ],
  [
      {
          "body": "Morbi lobortis neque a eleifend tempus.",
          "picture": "https://i.kinja-img.com/gawker-media/image/upload/s--rvDxfFQy--/c_scale,f_auto,fl_progressive,q_80,w_800/dvmy1g1vfsztrg3maakd.jpg"
      },
      {
          "body": "Donec vitae velit a odio ullamcorper aliquam consectetur at quam.",
          "picture": "https://i.ytimg.com/vi/EH5Ei-sMP60/maxresdefault.jpg"
      },
      {
          "body": "Proin sagittis nibh et quam blandit, a eleifend neque elementum.",
          "picture": "https://tblg.k-img.com/restaurant/images/Rvw/80206/640x640_rect_80206528.jpg"
      },
      {
          "body":  "Phasellus venenatis nisl in ante dictum sagittis.",
          "picture": "https://c-lj.gnst.jp/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20180116120327"
      },
      {
          "body": "Vestibulum cursus metus in massa aliquet, in dictum velit vehicula.",
          "picture": "http://www.coca-colaindia.com/content/dam/journey/in/en/private/stories/history/story-image-journey.jpg"
}
  ]
]

function seedDBs() {
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
                const comments = [];
                const body1 = "this is first comment of the " + UserData.username + "'s " + j + " post"
                Comments.create({author: UserData.username, body: body1}, (err, comment) => {
                  if (err) { return console.log(err) }
                  comments.push(comment._id)
                  const body2 = "this is second comment of the " + UserData.username + "'s " + j + " post"
                  Comments.create({author: UserData.username, body: body2}, (err, comment) => {
                    comments.push(comment._id)
                    Posts.create({author: UserData.username, body: Postdata.body, picture: Postdata.body, comments: comments})
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

async function seedDB() {
  await Users.deleteMany()
  await Session.deleteMany()
  await Profiles.deleteMany()
  await Posts.deleteMany()
  await Comments.deleteMany()
  console.log('clear all the data in the database')
  for (let i = 0; i < 5; i++) {
    await Users.create(UsersData[i])
    const user = await Profiles.create(ProfilesData[i])
    for (let j = 0; j < 5; j++) {
      // add the test posts
      const newAuthor = {id: user._id, username: user.username}
      let post = await Posts.create({author: newAuthor, body: PostsData[i][j].body, picture: PostsData[i][j].picture, comments: []})
      for (let k = 0; k < 2; k++) {
        // add the test comment
        body = "this is "+ k +" comment of the " + UsersData[i].username + "'s " + j + " post"
        let comment = await Comments.create({author: UsersData[i].username, body: body})
        post.comments.push(comment._id)
        await post.save()
      }
    }
  }
  console.log('reset all the test data in database')
}

module.exports = seedDB
