const express = require("express");
const controller = require('../../controllers/user-registration');

const userLog = express.Router();

userLog.post('/', controller.userLogin)

module.exports = userLog;