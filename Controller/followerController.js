var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const follower = asyncHandler(async (req, res) => {
    console.log("hello");


    var cook_id = req.cookies.home;
    var token = jwt.verify(cook_id, 'id');
    console.log("token verify", token);
    res.render('home.ejs', { data: token });

    var search_query = `select id from Elite_User where name like '${fname}%'`
    

})

module.exports={follower}