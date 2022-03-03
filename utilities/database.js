const mysql = require('mysql');
const config = require('../config/db.config');

let connection = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
});

module.exports = connection;
