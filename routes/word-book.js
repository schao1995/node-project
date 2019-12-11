let express = require('express')
let router = express.Router()
let db = require('./db')
/* GET users listing. */

router.post('/', (req, res, next) => {
  console.log('word')
  res.send({ 'a':990 })
})
module.exports = router
