const request       = require('request');

let synchronous_post = function (url , params ){

  let options = {
    url     : url ,
    form    : params
  };
  console.log(1)
  return new Promise(function(resolve, reject){
    console.log(2)
    request.get(options , function(error,response,body){
      console.log(3)
      if(error){
        reject(error);
      }else{
        resolve(body);
      }
    });
    console.log(4)
  });
}

let demo = async function(){
  let url = "http://www.baidu.com/";
  let body = await synchronous_post(url);
  // console.log(body);
}

demo()