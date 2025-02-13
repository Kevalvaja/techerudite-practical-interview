const express = require("express");

const privateApp = express();
privateApp.use(express.json());

privateApp.use('/api/users', require('../routers/r-user-registartion'));

module.exports = privateApp;