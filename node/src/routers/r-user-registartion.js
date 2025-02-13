const express = require("express");
const controller = require('../controllers/user-registration');

const userReg = express.Router();

userReg.get('/', controller.getData)

module.exports = userReg;