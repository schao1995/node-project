const express = require('express')
const router = express.Router()
const db = require('../db')
/* GET users listing. */

router.post('/', (req, res, next) => {
  console.log('a-p')
  console.log(req.body)
  res.json({
    code: 0,
    data: req.body,
    isSuccess: true,
    msg: "请求成功"
  })
  /* let sql = 'INSERT INTO painting' //写sql语句
  // console.log(sql)
  db.query(sql, function(err, rows) {   //从数据库查询
    console.log(rows)
    let data = null
    if(err) {
      data = {
        code: -1,
        data: null,
        isSuccess: false,
        msg: err
      }
    } else {
      data = {
        code: 0,
        data: rows,
        isSuccess: true,
        msg: "请求成功"
      }
    }
    console.log(data)
    res.json(data)  //返回查询结果
  }) */
})
module.exports = router
