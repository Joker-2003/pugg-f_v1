const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')


const app = express()
const apiPort = 3001

app.use(cookieParser())
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const dbo = require("./db/conn");


 

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(require("./Routes/oAuth"));

// app.get('/api/referral' , async (req,res) => {
//   async function createInvite (channel)  {
//    let invite = await client.channels.fetch(channel).createInvite({
//     unique: true,
//     maxAge: 0,
//    })
//     return invite;
//   }
//   //res.json(createInvite('983614866759770152'));
//   console.log(await client.guilds.fetch(process.env.GUIILD_ID))
//   res.send('Hello World!')
// })



app.listen(apiPort, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  
  
  console.log(`Server is running on port: ${apiPort}`);
});



