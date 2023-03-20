var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const express = require('express');
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");
const multer = require('multer')
const path = require('path')
const compress_images = require("compress-images")

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const query = util.promisify(conn.query).bind(conn)


var storageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        // callback(null, path.join(__dirname, 'public', 'images'))
        callback(null, './public/files');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

var upload = multer({ storage: storageEngine }).single('img');

const user_info = asyncHandler(async (req, res) => {

    var id = req.cookies.home
    var token_id = jwt.verify(id, 'id');
    //console.log(req.body)
    // console.log(req.body.bio)
    // console.log(req.body.contact)
    // var set = await query(`update Elite_User set number='${req.body.contact}', date_of_birth='${req.body.dob}', bio='${req.body.bio}' where id='${token_id}'`)
    console.log('Bharti')



    upload(req, res, function (err) {
    //     index1
        if (err) {
            console.log(err)
        } else {
            var FileName = req.file.filename;
            console.log(FileName);

            var imgsrc = '/files/' + req.file.originalname;
            var INPUT_path_to_your_images, OUTPUT_path;
            // INPUT_path_to_your_images='http://127.0.0.1:8011/public/files/' + req.file.originalname;
            INPUT_path_to_your_images = 'public/files/' + req.file.originalname;
            OUTPUT_path = "public/compress/";

            compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
                { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
                { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                { svg: { engine: "svgo", command: "--multipass" } },
                { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
                function (error, completed, statistic) {
                    console.log("-------------");
                    console.log(error);
                    console.log(completed);
                    console.log(statistic);
                    console.log("-------------");
                }
            )
            
            var compree_image = "/compress/" + req.file.originalname;

            var set = query( `update Elite_User set number='${req.body.contact}', date_of_birth='${req.body.dob}', bio='${req.body.bio}', user_image = '${compree_image}' where id='${token_id}'`)

            // var insertData = `INSERT INTO tweet(user_id,heading,description,media,compress_media)VALUES('1','${req.body.heading}','${req.body.desc}','${imgsrc}','${compree_image}')`
            // conn.query(insertData, (err, result) => {
            //     if (err) throw err
            //     res.send("file uploaded");

            // });

            res.render("home.ejs")
            //
            // res.redirect("/login/login/index5")
        }
    })

})

module.exports = { user_info }