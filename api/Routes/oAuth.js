const express = require("express");
const oauthRoutes = express.Router();
const {nanoid} = require("nanoid");

// This will help us connect to the database
const dbo = require("../db/conn");

const axios = require("axios");
const User = require("../db/models/User/User.Schema");
const { codeAuth, getUserData, checkGuild, checkRole, validateAccessToken, stopDuplicateCalls, joinGuild, checkError, fetchUserDB, validateReferCode, putReferral } = require("../helpers/Oauth.helper");
const Refer = require("../db/models/User/Refer.Schema");
const { addCoin, flagUser, unflagUser, checkCoin, removeCoin, updateHighScore } = require("../helpers/Game.helper");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you create a new record.

oauthRoutes.post('/api/register', codeAuth, async (req, res) => {
  return res.status(200).json({ access_token: req.payload.access_token });
});


oauthRoutes.route("/api/checkError").post(validateAccessToken, getUserData, checkError, async (req, res) => {
  console.log(req.payload)
  return res.status(200).json({ message: "VALIDATED_USER", access_token: req.payload.access_token });
})
oauthRoutes.route("/api/validate").post(validateAccessToken, getUserData, checkGuild, checkRole, async (req, res) => {
  const db_connect = dbo.getDb();
  const { id, username, avatar, access_token } = req.payload;
  const user = await db_connect.collection("users").findOne({ discord_id: id });
  if (user) {
    try {
      const user = await db_connect.collection("users").findOneAndUpdate({ discord_id: id }, { $set: { avatar: 'https://cdn.discordapp.com/avatars/' + id + "/" + avatar + ".png", username: username } });
    }
    catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Error creating user", error: err });
    }
  }
  else {
    let refer_code = nanoid(8);
    const newUser = new User({
      discord_id: id,
      username: username,
      avatar: 'https://cdn.discordapp.com/avatars/' + id + "/" + avatar + ".png",
      
      refer_code : refer_code,
    });
    try {
      const user = await db_connect.collection("users").insertOne(newUser);

    }
    catch (err) {
      return res.status(400).json({ message: "Error creating user", error: err });
    }
    try{
      const refer = await db_connect.collection("refer").insertOne({ refer_code: refer_code, created_by : id});
    }
    catch(err){
      console.log(err);
      return res.status(400).json({ message: "Error creating refer_code", error: err });
    }
  }
  return res.status(200).json({ message: "USER_VALIDATED", access_token, message: "success" });

})



oauthRoutes.post('/api/validate/easy', validateAccessToken, async (req, res) => {
  res.status(200).json({ message: "User validated", access_token: req.payload.access_token });
})
// oauthRoutes.route("/api/redirect/1").post(async function (req, res) {
//   let db_connect = dbo.getDb();

//   const code = req.body.code;
//   let message;
//   if (code) {
//     try {
//       const formData = new URLSearchParams({
//         client_id: process.env.CLIENT_ID,
//         client_secret: process.env.CLIENT_SECRET,
//         grant_type: "authorization_code",
//         code: code.toString(),
//         redirect_uri: process.env.REDIRECT_URI,
//       });
//       const response = await axios.post("https://discord.com/api/v8/oauth2/token", formData.toString(), {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//       }
//       )


//       const { access_token, refresh_token } = response.data;

//       const userResponse = await axios.get("https://discord.com/api/v8/users/@me", {
//         headers: {
//           "Authorization": `Bearer ${access_token}`
//         }
//       })


//       const guilds = await axios.get("https://discord.com/api/v8/users/@me/guilds", {
//         headers: {
//           "Authorization": `Bearer ${access_token}`
//         }
//       })

//       let GUILD_ID = process.env.GUILD_ID;


//       let guild = guilds.data.find((g) => g.id === GUILD_ID);

//       if (guild) {
//         const roleData = await axios.get(`https://discord.com/api/v8/users/@me/guilds/${GUILD_ID}/member`, {
//           headers: {
//             "Authorization": `Bearer ${access_token}`
//           }
//         })
//         let role = roleData.data.roles.find((r) => r === process.env.ROLE_ID);
//         if (role) {
//           let user = new User({
//             discord_id: userResponse.data.id,
//             access_token: access_token,
//             refresh_token: refresh_token,
//             avatar: 'https://cdn.discordapp.com/avatars/' + userResponse.data.id + "/" + userResponse.data.avatar + ".png",
//             username: userResponse.data.username,
//           })
//           db_connect.collection("users").findOne({ discord_id: userResponse.data.id }, function (err, res1) {
//             if (err) throw err;

//             if (res1 === null) {
//               db_connect.collection("users").insertOne(user, function (err, res1) {
//                 if (err) throw err;

//               });
//             }
//             else {
//               db_connect.collection("users").updateOne({ discord_id: userResponse.data.id }, { $set: { access_token: access_token, refresh_token: refresh_token, username: userResponse.data.username + "#" + userResponse.data.discriminator, } }, function (err, res1) {
//                 if (err) throw err;

//               });
//             }
//           });


//         }
//         else {

//           message = 'NO_ROLE'

//         }
//       }
//       else {

//         message = 'NO_GUILD'


//       }
//       if (message) {


//         return res.status(400).json({
//           status: 'error',
//           message: message
//         })
//       }
//       else {
//         return res.status(200).json({
//           status: 'ok',
//           access_token: access_token,
//           refresh_token: refresh_token,

//         })
//       }


//     }
//     catch (err) {
//       return res.status(400).json({
//         status: 'error',
//         message: err,
//       })
//     }
//   }


// });

// oauthRoutes.route("/api/validate/1").post(async function (req, res) {
//   let ac, rf
//   let db_connect = dbo.getDb();
//   const access_token = req.headers.authorization.split(' ')[1];
//   let message;
//   try {
//     const userResponse = await axios.get("https://discord.com/api/v8/users/@me", {
//       headers: {
//         "Authorization": `Bearer ${access_token}`
//       }
//     })
//     db_connect.collection("users").findOne({ discord_id: userResponse.data.id }, function (err, res1) {
//       if (err) throw err;
//       if (res1 === null) {
//         message = 'NO_USER'
//       }
//       else {
//         ac = res.access_token;
//         rf = res.refresh_token;
//       }
//     }
//     );
//     console.log(message , ac , rf)
//     if (message) {
//       return res.status(400).json({
//         status: 'error',
//         message: message
//       })
//     }
//     else {

//       return res.status(200).json({
//         status: 'ok',
//         access_token: ac,
//         refresh_token: rf,

//       })
//     }
//   }
//   catch (err) {


//       return res.status(400).json({
//         status: 'error',
//         message: err,
//       })

//   }



// });
// oauthRoutes.route("/api/validateAccess").post(async function (req, res) {
//   let ac, rf
//   let db_connect = dbo.getDb();
//   const access_token = req.headers.authorization.split(' ')[1];
//   let message;

//   const { refresh_token } = req.body;
//   try {
//     const userResponse = await axios.get("https://discord.com/api/v8/users/@me", {
//       headers: {
//         "Authorization": `Bearer ${access_token}`
//       }
//     })
//     const guilds = await axios.get("https://discord.com/api/v8/users/@me/guilds", {
//       headers: {
//         "Authorization": `Bearer ${access_token}`
//       }
//     })

//     let GUILD_ID = process.env.GUILD_ID;
//     let guild = guilds.data.find((g) => g.id === GUILD_ID);

//     console.log(guild);
//     if (guild) {
//       const roleData = await axios.get(`https://discord.com/api/v8/users/@me/guilds/${GUILD_ID}/member`, {
//         headers: {
//           "Authorization": `Bearer ${access_token}`
//         }
//       })
//       let role = roleData.data.roles.find((r) => r === process.env.ROLE_ID);
//       if (role) {

//         if (userResponse.status === 200) {
//           db_connect.collection("users").updateOne({ discord_id: userResponse.data.id }, { $set: { access_token: access_token, refresh_token: refresh_token, username: userResponse.data.username, } }, function (err, res) {
//             if (err) throw err;

//           });
//           rf = refresh_token
//           ac = access_token
//         }
//       }
//       else {

//         message = 'NO_ROLE'

//       }
//     }
//     else {

//       message = 'NO_GUILD'

//     }

//   }
//   catch (err) {
//     const formData = new URLSearchParams({
//       client_id: process.env.CLIENT_ID,
//       client_secret: process.env.CLIENT_SECRET,
//       grant_type: "refresh_token",
//       refresh_token: refresh_token,
//     });
//     try {
//       const response = await axios.post("https://discord.com/api/v10/oauth2/token", formData.toString(), {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//       }
//       )

//       const { access_token, refresh_token } = response.data;
//       const userResponse = await axios.get("https://discord.com/api/v8/users/@me", {
//         headers: {
//           "Authorization": `Bearer ${access_token}`
//         }
//       })
//       const guilds = await axios.get("https://discord.com/api/v8/users/@me/guilds", {
//         headers: {
//           "Authorization": `Bearer ${access_token}`
//         }
//       })

//       let GUILD_ID = process.env.GUILD_ID;
//       let guild = guilds.data.find((g) => g.id === GUILD_ID);


//       if (guild) {
//         const roleData = await axios.get(`https://discord.com/api/v8/users/@me/guilds/${GUILD_ID}/member`, {
//           headers: {
//             "Authorization": `Bearer ${access_token}`
//           }
//         })
//         let role = roleData.data.roles.find((r) => r === process.env.ROLE_ID);
//         if (role) {

//           if (userResponse.status === 200) {
//             db_connect.collection("users").updateOne({ discord_id: userResponse.data.id }, { $set: { access_token: access_token, refresh_token: refresh_token, username: userResponse.data.username, } }, function (err, res) {
//               if (err) throw err;

//             });
//             rf = refresh_token
//             ac = access_token
//           }
//         }
//         else {

//           message = 'NO_ROLE'

//         }
//       }
//       else {

//         message = 'NO_GUILD'

//       }


//     }

//     catch (err) {
//       return res.status(400).json({
//         status: 'error',
//         description: err
//       })
//     }






//   }
//   if (!message) {
//     return res.status(200).json({
//       status: 'ok',
//       access_token: ac,
//       refresh_token: rf,
//     })
//   }
//   else {
//     return res.status(400).json({
//       status: 'error',
//       message: message
//     })
//   }
// });

oauthRoutes.route("/api/fetchUser").get(async function (req, res) {
  let db_connect = dbo.getDb();
  const access_token = req.headers.authorization.split(' ')[1];

  try {
    const userResponse = await axios.get("https://discord.com/api/v8/users/@me", {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    })
    if (userResponse.status === 200) {
      db_connect.collection("users").findOne({ discord_id: userResponse.data.id }, function (err, res1) {
        if (err) throw err;
        if (res1 === null) {
          return res.status(400).json({
            status: 'error',
            description: 'User not found'
          })
        }
        else {
          return res.status(200).json({
            status: 'ok',
            user: res1,
            WEEK : process.env.WEEK
          })
        }
      });
    }
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'error',
      description: err
    })
  }
});

oauthRoutes.route("/api/fetchLeaderBoards/week").post(async function (req, res) {
  console.log(req.body);
  let db_connect = dbo.getDb();
  const access_token = req.headers.authorization.split(' ')[1];
  const week = req.body.week;
  try {
    const userResponse = await axios.get("https://discord.com/api/v8/users/@me", {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    })
    if (userResponse.status === 200) {
      try{
    let res1 = await  db_connect.collection("users").aggregate([
      { "$unwind": `$${week}` },
      { "$sort": {[`${week}.high_game${req.body.game}`]: 1 }},
      { "$match" : { flagged : false} }
] ).toArray();
  let result = []
    for (let i = 0; i < res1.length; i++) {
        result.push({
          discord_id : res1[i].discord_id,
          username: res1[i].username,
          score: res1[i][week][`high_game${req.body.game}`],
          avatar: res1[i].avatar,
          flagged : false
        })
    } 
    return res.status(200).json({
      status: 'ok',
      users: result,
      username : userResponse.data.username
    })
 }
      catch(err){
        console.log(err);
      }

    }
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'error',
      description: err
    })
  }
});


oauthRoutes.get("/api/getFlagged", async function (req, res){
  let db_connect = dbo.getDb();
  let res1 = await db_connect.collection("users").find({flagged : true}).toArray();
  let result = []
    for (let i = 0; i < res1.length; i++) {
        result.push({
          discord_id : res1[i].discord_id,
          username: res1[i].username,
          avatar: res1[i].avatar,
          flagged : true,
        })
    } 
  return res.status(200).json({
    status: 'ok',
    users: result
  })
})
oauthRoutes.route("/api/fetchLeaderBoards/all").post(async function (req, res) {
  let db_connect = dbo.getDb();
  const access_token = req.headers.authorization.split(' ')[1];

  try {
    const userResponse = await axios.get("https://discord.com/api/v8/users/@me", {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    })
    if (userResponse.status === 200) {
      db_connect.collection("users").find({flagged : false}).sort({ ["all_" + req.body.game]: -1 }).limit(10).toArray(function (err, result) {
        if (err) throw err;
        let users = []
        for (let i = 0; i < result.length; i++) {
          users.push({
            username: result[i].username,
            score: result[i]["all_" + req.body.game],
            avatar: result[i].avatar
          })
        }
        return res.status(200).json({
          status: 'ok',
          username: userResponse.data.username,
          users: users
        })
      });
    }
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'error',
      description: err
    })
  }
});

oauthRoutes.get("/api/joinGuild",validateAccessToken, getUserData,  async (req, res) => {
  res.redirect(process.env.FRONTEND_URL + '/redirect/login')
})

oauthRoutes.post("/api/addCoin" , validateAccessToken, getUserData, addCoin)

oauthRoutes.post("/api/removeCoin" , validateAccessToken, getUserData, removeCoin)

oauthRoutes.get("/api/checkCoin" , validateAccessToken, getUserData, checkCoin)

oauthRoutes.post("/api/updateScore" , validateAccessToken, getUserData, updateHighScore)

oauthRoutes.post("/api/flagUser" , validateAccessToken, getUserData, flagUser)

oauthRoutes.post("/api/unflagUser" , validateAccessToken, getUserData, unflagUser)

oauthRoutes.post("/api/validateReferral" , validateReferCode)

oauthRoutes.post("/api/putReferral" , validateAccessToken, getUserData, putReferral)

module.exports = oauthRoutes;