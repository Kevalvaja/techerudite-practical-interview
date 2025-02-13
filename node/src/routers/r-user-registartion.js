const express = require("express");
const controller = require('../controllers/user-registration');

const userReg = express.Router();

userReg.get('/', controller.getData)
userReg.get('/:id', controller.getDataById)
userReg.post('/', controller.userRegistration)

module.exports = userReg;