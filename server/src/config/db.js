const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_USER || process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_PASSWORD || process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_DATABASE || process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_PORT || process.env.MYSQL_ADDON_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10
})

module.exports = pool
