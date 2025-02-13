const dotenv = require("dotenv");
dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    USER_NAME: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD,
    DBNAME: process.env.DBNAME,
    WEBTOKENSCREETKEY: process.env.WEBTOKENSCREETKEY,
}
