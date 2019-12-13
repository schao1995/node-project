// 引入所需要的第三方包
const cheerio = require('cheerio')
const http = require('http')
const util = require('util')

let httpGet = function (word) {
  /*const httpGet = util.promisify(http.get)
  httpGet(`http://dict.youdao.com/search?q=${word}&keyfrom=new-fanyi.smartResult`).then((res) => {
    let data = ''
    res.on('data',function(chunk){
      data += chunk
    })
    res.on('end',function(){
      filter(data)
      console.log('1')
    })
  }).catch(() => {
    // Handle the error.
    console.log('err')
  })*/
  return new Promise(function (resolve, reject) {
    let req = http.get(`http://dict.youdao.com/search?q=${word}&keyfrom=new-fanyi.smartResult`, (res) => {
      let data = '';
      res.on('data',function(chunk){
        data += chunk
      })
      res.on('end',function(){
        let msg = filter(data)
        resolve(msg)
        console.log('1')
      })
    })
  })
  /*http.get(`http://dict.youdao.com/search?q=${word}&keyfrom=new-fanyi.smartResult`,(res) => {
    let data = ''
    res.on('data',function(chunk){
      data += chunk
    })
    res.on('end',function(){
      filter(data)
      console.log('1')
    })
  })*/
}

function filter(data){
  //保存单词
  let result = {}
  //将页面源代码转换为$对象
  let $ = cheerio.load(data)
  let word = $('#phrsListTab').find('.keyword').text()
  let pronounce = $('#phrsListTab').find('.pronounce')
  let paraphrase = $('#phrsListTab').find('.trans-container').find('li')

  let date = new Date()
  result.word = word
  result.time = date.toLocaleDateString()
  result.soundmarkF = ''
  result.soundmarkS = ''
  result.paraphrase = ''
  pronounce.each(function(index,item){
    if (index === 0) {
      let arr = $(item).text().split('\n')
      result.soundmarkF = arr[0] + '__' + arr[1].replace(/\s*/g,"") + '__http://dict.youdao.com/dictvoice?audio='+ word +'&type=1'
    } else if (index === 1) {
      let arr = $(item).text().split('\n')
      result.soundmarkS = arr[0] + '__' + arr[1].replace(/\s*/g,"") + '__http://dict.youdao.com/dictvoice?audio='+ word +'&type=2'
    }
  })
  paraphrase.each(function(index,item){
    result.paraphrase += $(item).text()
    if(index !== paraphrase.length - 1) {
      result.paraphrase += '__'
    }
  })
  // console.log(result)
  return result
}
let acquireWord = async function(word){
  return await httpGet(word);
  // console.log(body);
}
module.exports = acquireWord