const mysql = require('mysql2');

function createDBConnection() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
  return connection;
}

module.exports = {
  createDBConnection,
}