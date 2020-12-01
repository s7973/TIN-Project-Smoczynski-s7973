const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Warszawa!1',
    database: 'Academy'
});

module.exports = pool;