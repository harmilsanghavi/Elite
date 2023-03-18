var mysql = require('mysql2');
var express = require('express');
var util = require('util')
var app = express();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
app.set(express.json());
var jwt = require('jsonwebtoken')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/assets", express.static('assets'))
const bcrypt = require("bcrypt")

var con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: '2023_Elite'
    }
)

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected Successful!");
})

const query = util.promisify(con.query).bind(con)

app.get('/followers', async function (req, res) {
    var user_name = await query (`select name from Elite_User where id='1';`)
    var user_result = user_name[0].name
    // console.log(user_result);
    var followers_count = await query (`SELECT COUNT(id) as x FROM user_follower where user_id_id='1';`);
    var follower_result = followers_count[0].x;
          

    var following_count = await query (`SELECT COUNT(id) as x FROM user_following where user_i='1';`);
    var following_result = following_count[0].x;
        res.render('followers.ejs', {count:follower_result,count1:following_result,uname:user_result})
       
});
app.get('/list' ,async function(req,res){

 var followers_name = await query (`SELECT Elite_User.name, user_follower.follower_id,user_follower.user_id_id
 FROM Elite_User
 INNER JOIN user_follower ON user_follower.follower_id = Elite_User.id where user_id_id='1';`);
 console.log(followers_name);
 const name=[]
    for( i=0;i<followers_name.length;i++){
      var name1 = followers_name[i].name;

      name.push(name1);
    }
   res.render('follow_list.ejs',{data:name})
    console.log("array",name);
        

})
app.get('/list2', async function(req,res){
    var following_name = await query (`SELECT Elite_User.name, user_following.following_id,user_following.user_i
    FROM Elite_User
    INNER JOIN user_following ON user_following.following_id = Elite_User.id where user_i='1'`);
    console.log(following_name);
    const name1 = [];
    for(i=0;i<following_name.length;i++){
        var name2 = following_name[i].name;
        console.log(name2);
        name1.push(name2);
        
    }
    res.render("following_list.ejs",{data:name1})
})


app.listen(5000)