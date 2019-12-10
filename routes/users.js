let express = require('express');
let router = express.Router();
let db = require('./db')

/* GET users listing. */

router.post('/', function(req, res, next) {
  console.log('req.body')
  console.log(req.params)
  console.log(req.body)
  console.log(req.query)

  let sql="select * from `user`"  //写sql语句
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
    res.json(data)  //返回查询结果
  })
});
module.exports = router;
