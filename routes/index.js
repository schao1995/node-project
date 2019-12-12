const express = require('express')
const router = express.Router()
const db = require('./db')
const acquireWord = require('./acquireWord')
/* GET users listing. */

router.post('/', (req, res, next) => {
  console.log('word')
  res.send(acquireWord('size'))
})
module.exports = router
