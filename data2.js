const express = require('express');

const app = express();
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const multer = require("multer");
const compress_images = require("compress-images")
var cookie = require('cookie-parser');
const conn =  require('./connection/connection')
const register =  require('./Routes/register')
const login = require('./Routes/login')
const logout = require('./Routes/logout')
const tweet = require('./Routes/tweet')
const prof = require('./Routes/prof')
const accountD = require('./Routes/accountD')

const search = require('./Routes/search')
const list=require('./Routes/list')
const likes=require('./Routes/likes')

var c;
app.use(express.static('public'));
app.set('view engine', "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie());

const query = util.promisify(conn.query).bind(conn)

conn.connect((err) => {
   if (err) throw err;
   console.log("succedd");
})



app.use('/registration',register)
app.use('/login',login)
app.use('/logout',logout)
app.use('/tweet',tweet)
app.use('/prof',prof)
app.use('/deleteAccount',accountD)
app.use('/search',search)
app.use('/list',list)
app.use('/likes',likes)





// app.get('/tweet_show',(req,res) =>
// {
//    var cook = req.cookies.authcookie;
//    console.log("cookie: ", cook);
//    if (!cook) {
//       var str = "";
//       c=0;
//       res.render('login.ejs', { str,c});
      
//    }else{
//       var id = req.cookies.home;
//       var token = jwt.verify(id, 'id');
//       console.log(token)
//       var image = `select heading,description,media_url from user_tweets where u_id='${token}'`;
//       conn.query(image,(err,data) =>{
//       if(err) throw err;
//       console.log(data);
//       res.render('tweet.ejs',{data});
//       })
//    }
// })

app.listen(2081);