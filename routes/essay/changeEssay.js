const express = require('express')
const router = express.Router()
const db = require('../db')
const fs = require('fs')
/* GET users listing. */

router.post('/', (req, res, next) => {
  // console.log('word-book')
  // console.log(sql)
  let id = parseInt(req.body.id)
  let title = req.body.title
  let oldTitle = req.body.oldTitle
  let content = req.body.content
  let explain = req.body.explain
  console.log('-----id----')
  console.log(typeof id)
  console.log(title)
  console.log(oldTitle)
  console.log(content)
  console.log(explain)
  if (oldTitle !== '') {
    fs.writeFileSync('../../../node-project-essay/' + oldTitle + '.html', content)
    fs.rename('../../../node-project-essay/' + oldTitle + '.html','../../../node-project-essay/' + title + '.html', function(err){
      if(err){
        throw err;
      }
      console.log('done!');
    })
    let sql = 'update essay set title=\'' + title + '\',`explain`=\'' + explain + '\' where id=' + id
    // let sql = 'update essay set title=\'' + title + '\' where id=' + id
    console.log(sql)
    db.query(sql, function(err, rows) {
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
          code: 1,
          data: rows,
          isSuccess: false,
          msg: '修改成功'
        }
      }
      res.json(data)
    })
  } else {
    fs.writeFileSync('../../../node-project-essay/' + title + '.html', content)
    let sql = 'insert into essay (title, `explain`) values (\'' + title + '\',\'' + explain + '\')'
    console.log(sql)
    db.query(sql, function(err, rows) {
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
          code: 1,
          data: rows,
          isSuccess: false,
          msg: '添加成功'
        }
      }
      res.json(data)
    })
  }
})
module.exports = router
