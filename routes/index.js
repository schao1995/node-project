const express = require('express')
const router = express.Router()
const db = require('./db')
/* GET users listing. */

router.post('/', (req, res, next) => {
  console.log('ind')
  let acq = 'aa'
  console.log(acq)
  res.send(acq)
})
module.exports = router
