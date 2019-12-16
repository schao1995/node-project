const express = require('express')
const router = express.Router()
const db = require('../db')
const acquireWord = require('../utils/acquireWord')
/* GET users listing. */

router.post('/', (req, res, next) => {
  console.log('word')
  console.log(req.body.word)
  let word = req.body.word
  let promise = new Promise(function (resolve, reject) {
    let data = acquireWord(word)
    resolve(data)
  })
  promise.then(function (data) {
    //then第一个函数是成功的回调，参数是resolve(data)中的data
    console.log('2')
    if (data.word == '') {
      res.json({
        code: -1,
        data: null,
        isSuccess: false,
        msg: '请检查单词是否正确'
      })
    }
    appendWordToSql (data, res)
  }, function (err) {
    //then第二个函数是失败的回调函数，参数是reject(err)中的err错误对象
    console.log('失败：' + err)
  })
  // console.log(acq)
  // res.send(acq)
})
function appendWordToSql (data, res) {
  let sql = `INSERT INTO wordBook(time, word, soundmarkF, soundmarkS, paraphrase)  VALUES('${data.time}','${data.word}','${data.soundmarkF}','${data.soundmarkS}','${data.paraphrase}')`
  console.log(sql)
  let appendData = [
    data.time,
    data.word,
    data.soundmarkF,
    data.soundmarkS,
    data.paraphrase
  ]
  db.query(sql, function(err, rows) {   //从数据库查询
    console.log(rows)
    let data = null
    if(err) {
      data = {
        code: -1,
        data: null,
        isSuccess: false,
        msg: '单词重复'
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
  })
}
module.exports = router
