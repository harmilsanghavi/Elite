var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const home = asyncHandler(async (req, res) => {
    var fname = req.query.var;

    
    var search_query = `select * from Elite_User where name like '${fname}%'`
    console.log(search_query);
    const arr = [];

    conn.query(search_query,(err,data)=>{
        if(err)throw err
        console.log(data);
        for(i=0;i<data.length;i++){
          arr.push(data[i]);
            }
         
          res.json(arr);
        
    })
  

})

module.exports={home}