var str = '000p111p222p333'
str = str.replace(/(.*)p/, '$1div')
console.log(str)  //000p111p222div333