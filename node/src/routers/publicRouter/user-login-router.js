const express = require("express");
const controller = require('../../controllers/user-registration');

const userRouter = express.Router();

userRouter.post('/userLogin', controller.userLogin)
userRouter.post('/', controller.userRegistration)

module.exports = userRouter;