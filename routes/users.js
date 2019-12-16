let express = require('express')
let router = express.Router()
let db = require('./db')
let jwt = require('jsonwebtoken');
/* GET users listing. */

router.post('/', function(req, res, next) {
  console.log('req.body')
  console.log(req.body.username)
  console.log(req.body.password)

  let sql = 'select * from `user` where username="' + req.body.username + '" and password="' + req.body.password + '"' //写sql语句
  console.log(sql)
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
      let content ={ name: req.body.username } // 要生成token的主题信息
      let secretOrPrivateKey = 'jwt' // 这是加密的key（密钥）
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 4  // 4小时过期
      })
      data = {
        code: 0,
        data: rows,
        token: token,
        isSuccess: true,
        msg: "请求成功"
      }
      /*let date = new Date()
      let time = date.toLocaleDateString()
      let sqlLog = `INSERT INTO operationLog(user, operationContent, time)  VALUES(${req.body.username}, '登录', ${time})`
      db.query(sqlLog, function(err, rows) {
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
      })*/
    } else {
      data = {
        code: -1,
        data: rows,
        isSuccess: true,
        msg: "用户名或密码错误"
      }
    }
    res.json(data)  //返回查询结果
  })
})
module.exports = router
