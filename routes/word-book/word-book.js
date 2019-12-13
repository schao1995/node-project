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
      }
      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows.length - i; j++) {
          // 相邻元素两两对比，元素交换，大的元素交换到后面
          if (rows[j] > rows[j + 1]) {
            let temp = rows[j];
            rows[j] = rows[j+1];
            rows[j+1] = temp;
          }
        }
      }*/
      data = {
        code: 0,
        data: [{
          time: rows[0].time,
          words: [
            {
              id: rows[0].id,
              word: rows[0].word,
              soundmarkF: rows[0].soundmarkF.split('__'),
              soundmarkS: rows[0].soundmarkS.split('__'),
              paraphrase: rows[0].paraphrase.split('__')
            }
          ]
        }],
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
