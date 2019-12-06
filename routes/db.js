
// 连接mysql
let express = require('express')
let router = express.Router()
let mysql = require('mysql')
let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'project'
})

function query (sql, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      callback(err, rows)
      connection.release()
    })
  })
}

exports.query = query