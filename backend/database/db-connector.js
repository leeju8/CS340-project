let mysql = require('mysql2');

const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_leeju8',
    password: '7028',
    database: 'cs340_leeju8'
}).promise();

module.exports = pool;