var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const deleteA = asyncHandler(async (req, res) => {
    
    var id = req.cookies.home;
    var token_id = jwt.verify(id, 'id');
    
    var sql=await query(`update Elite_User set is_delete=1 where id='${token_id}'`);
    res.clearCookie("authcookie");
    res.clearCookie("home");
    res.send({data:"hello"});
})

module.exports = { deleteA }