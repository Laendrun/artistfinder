const mysql = require('mysql2');

function createDBConnection() {
  const connection = mysql.createConnection({
    host: 'lx3d0.myd.infomaniak.com',
    user: 'lx3d0_artistfind',
    password: 'I-QbEBo3xZ0',
    database: 'lx3d0_artistfinder'
  });
  return connection;
}

module.exports = {
  createDBConnection,
}