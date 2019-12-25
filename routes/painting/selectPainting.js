const express = require('express')
const router = express.Router()
const db = require('../db')
/* GET users listing. */

router.post('/', (req, res, next) => {
  let sql = 'select * from painting LIMIT 0, 10' //写sql语句
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
    } else if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        rows[i].srcList = rows[i].srcList.split(',')
      }
      data = {
        code: 0,
        data: rows,
        isSuccess: true,
        msg: "请求成功"
      }
    } else {
      data = {
        code: 1,
        data: rows,
        isSuccess: true,
        msg: ""
      }
    }
    console.log(data)
    res.json(data)  //返回查询结果
  })
})
module.exports = router
