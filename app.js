const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser') // 解析前端传来的get，post数据
let jwt = require('jsonwebtoken')


const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const wordBookRouter = require('./routes/word-book/word-book')
const appendWordRouter = require('./routes/word-book/appendWord')
const app = express()

//设置跨域请求
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// users
// app.use('/users', urlencodedParser, usersRouter)
app.use('/users', usersRouter)

// 中间件验证token
app.use(function (req, res, next) {
  console.log('LOGGED')
  let token = req.headers['token'] // 获取token
  let secretOrPrivateKey="jwt" // 这是加密的key（密钥）
  jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
    if (err) {  //  时间失效的时候 || 伪造的token
      res.send({
        'msg': '登录过期，请重新登录',
        'code': 401
      })
    } else {
      next()
    }
  })
})

// const urlencodedParser = bodyParser.urlencoded({ extended: false })
// index
app.use('/', indexRouter)

app.use('/word-book', wordBookRouter)
app.use('/appendWord', appendWordRouter)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
