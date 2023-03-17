const express = require("express")
const app = express();
const router = express.Router()

const {home } = require('../Controller/searchController')

router.route('/home').get(home)

module.exports = router