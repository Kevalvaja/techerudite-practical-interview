const mysql = require("mysql");
const config = require("../configs/config");

const db = mysql.createPool({
    host: config.HOST,
    user: config.USER_NAME,
    password: config.PASSWORD,
    database: config.DBNAME,
})

db.getConnection((err, connection) => {
    if (err) {
        console.log(`Server is not connected to MySQL database...😴😪`, err.message);
    } else if (connection) {
        console.log(`Server is connected to MySQL database...😍🤩🎉`);
    } else {
        console.log(`Somethig is wrong with MySQL database...🤔🤔🤔`);
    }
})

module.exports = db;