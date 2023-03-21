const express = require("express")
const app = express();
const router = express.Router()

const {likes} = require('../Controller/likeController')

router.route('/likes').get(likes)



module.exports = router