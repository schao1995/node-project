//文件下载
var fs = require("fs");
var path = require("path");
var request = require("request");

//创建文件夹目录
var dirPath = path.join(__dirname, "../../node-project-mp3");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log("文件夹创建成功");
} else {
  console.log("文件夹已存在");
}

let fileName = "and.mp3";
// let url = "https://xxx.sdhdbd1.com/cb9/sd/gc/g1/670BC531/SD/";
let url = "http://dict.youdao.com/dictvoice?audio=and&type=2";
let stream = fs.createWriteStream(path.join(dirPath, fileName));
request(url).pipe(stream).on("close", function (err) {
  console.log("文件[" + fileName + "]下载完毕");
});

//整数转字符串，不足的位数用0补齐
function intToString(num, len) {
  let str = num.toString();
  while (str.length < len) {
    str = "0" + str;
  }
  return str;
}