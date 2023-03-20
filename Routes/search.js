const express = require("express")
const app = express();
const router = express.Router()

const {home} = require('../Controller/searchController')
const {follower} = require('../Controller/searchController')

router.route('/home').get(home)
router.route('/follower').get(follower)

module.exports = router