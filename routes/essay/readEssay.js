const express = require('express')
const router = express.Router()
const db = require('../db')
const fs = require('fs')
/* GET users listing. */

router.post('/', (req, res, next) => {
  // console.log('word-book')
  // console.log(sql)
  let title = req.body.title
  let content = fs.readFileSync('../../../node-project-essay/' + title + '.html', 'utf-8')
  // console.log("同步读取: " + content.toString())
  let data = {
    code: 0,
    data: content.toString(),
    isSuccess: true,
    msg: "请求成功"
  }
  res.json(data)  //返回查询结果
})
module.exports = router
