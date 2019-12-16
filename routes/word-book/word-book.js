const express = require('express')
const router = express.Router()
const db = require('../db')
/* GET users listing. */

router.post('/', (req, res, next) => {
  // console.log('word-book')
  let sql = 'select * from wordBook LIMIT 0, 30' //写sql语句
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
      let words = []
      /*for(let i = 0; i < rows.length; i++) {
        words.append({})
      }*/
      console.log(rows[0])
      console.log(rows[0].time)

      // 对返回数据进行按时间排序的处理
      for (let i = 0; i < rows.length - 1; i++) {
        for (let j = 0; j < rows.length - 1 - i; j++) {
          let timeOne = new Date(rows[j].time)
          let timeTwo = new Date(rows[j + 1].time)
          // 相邻元素两两对比，元素交换，大的元素交换到后面
          if (timeOne > timeTwo) {
            let temp = rows[j];
            rows[j] = rows[j+1];
            rows[j+1] = temp;
          }
        }
      }
      for (let i = 0; i < rows.length; i++) {
        for (let j = i; j < rows.length; j++) {
          if (j === i && rows[i].time === rows[j].time) {
            if (words.length == 0 || words[words.length - 1].time !== rows[i].time)
            words.push({
              time: rows[i].time,
              words: [
                {
                  id: rows[j].id,
                  word: rows[j].word,
                  soundmarkF: rows[j].soundmarkF.split('__'),
                  soundmarkS: rows[j].soundmarkS.split('__'),
                  paraphrase: rows[j].paraphrase.split('__')
                }
              ]
            })
          } else if (rows[i].time === rows[j].time) {
            console.log(i + '-----------')
            console.log(j + '-----------')
            console.log(rows[j].word)
            if (i > 0 && rows[i].time === rows[i - 1].time) {
              continue
            }
            words[words.length - 1].words.push({
                  id: rows[j].id,
                  word: rows[j].word,
                  soundmarkF: rows[j].soundmarkF.split('__'),
                  soundmarkS: rows[j].soundmarkS.split('__'),
                  paraphrase: rows[j].paraphrase.split('__')
                })
          }
        }
      }
      console.log(rows)
      console.log(words)
      data = {
        code: 0,
        data: words,
        isSuccess: true,
        msg: "请求成功"
      }
    } else {
      data = {
        code: 1,
        data: rows,
        isSuccess: true,
        msg: "还未添加单词"
      }
    }
    console.log(data)
    res.json(data)  //返回查询结果
  })
})
module.exports = router
