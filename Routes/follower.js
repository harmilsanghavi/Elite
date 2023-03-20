const express = require("express")
const app = express();
const router = express.Router()

const { follower } = require('../Controller/followerController')

router.route('/follower').get(follower)

module.exports = router