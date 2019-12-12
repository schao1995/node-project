// 引入所需要的第三方包
const cheerio = require('cheerio')
const http = require('http')

function acquireWord (word) {
  http.get(`http://dict.youdao.com/search?q=${word}&keyfrom=new-fanyi.smartResult`,(res) => {
    let data = ''
    res.on('data',function(chunk){
      data += chunk
    })
    res.on('end',function(){
      filter(data)
      console.log('1')
    })
  })
  console.log('2')
}
function filter(data){
  //保存单词
  let result = {}
  //将页面源代码转换为$对象
  let $ = cheerio.load(data)
  let word = $('#phrsListTab').find('.keyword').text()
  let pronounce = $('#phrsListTab').find('.pronounce')
  let paraphrase = $('#phrsListTab').find('.trans-container').find('li')

  result.word = word
  result.time = '2019-01-01'
  result.soundmarkF = ''
  result.soundmarkS = ''
  result.paraphrase = ''
  pronounce.each(function(index,item){
    if (index === 0) {
      let arr = $(item).text().split('\n')
      result.soundmarkF = arr[0] + '__' + arr[1].replace(/\s*/g,"")
    } else if (index === 1) {
      let arr = $(item).text().split('\n')
      result.soundmarkS = arr[0] + '__' + arr[1].replace(/\s*/g,"")
    }
  })
  paraphrase.each(function(index,item){
    result.paraphrase += $(item).text() + '__'
  })
  return result
}
module.exports = acquireWord