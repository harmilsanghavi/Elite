var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const home = asyncHandler(async (req, res) => {

  var cook_id = req.cookies.home;
  var token = jwt.verify(cook_id, 'id');
  // console.log("token verify::::  ", token);

    var fname = req.query.var;
    var search_query = `select * from Elite_User where name like '${fname}%'`
 
    const arr = [];

    conn.query(search_query,(err,data)=>{
        if(err)throw err
        // console.log(data);
        for(i=0;i<data.length;i++){
          arr.push(data[i]);
            }
         
          res.json(arr);
    })
})

const follower =asyncHandler(async(req,res) =>
{
  var cook_id = req.cookies.home;
  var token = jwt.verify(cook_id, 'id');
  var follower_id = token;
  console.log("follower_id:::::::  ",follower_id)

  var id = req.query.follower_id;
  console.log("user_id:::: ",id);

  
  var follower_insert = `INSERT INTO user_follower (user_id_id, follower_id, is_delete) VALUES ('${id}','${follower_id}', '0');`

  conn.query(follower_insert,(err,data)=>{
    if(err)throw err
     console.log("succedd");

     var following_insert = `INSERT INTO user_following (user_i, following_id, is_delete) VALUES ('${follower_id}','${id}', '0');`
     conn.query(following_insert,(err,data)=>{
      if(err)throw err;
      console.log("thai gyu");
     })
  })

})
 
 

module.exports={home,follower}