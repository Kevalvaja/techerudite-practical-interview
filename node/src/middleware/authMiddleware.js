const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../configs/config");

const middlewareRouter = express.Router()

const verifyToken = middlewareRouter.use("/", async (req, res, next) => {
    try {
        const token = req?.headers["authorization"]
        if (!token) {
            return res?.status(404)?.json({
                status: 404,
                message: "Token not found!",
                error_type: "Error",
                data: {},
            });
        }

        jwt.verify(token, config.WEBTOKENSCREETKEY, (err, data) => {
            if (err) {
                return res?.status(200)?.json({
                    status: 200,
                    message: "No Error",
                    error_type: "SUCCESS",
                    data: "❌Authentication Failed",
                });
            } else if (data?.user_id && data?.user_role) {
                next()
            }
        })
    } catch (error) {
        return res?.status(400)?.json({
            status: 400,
            message: "Error Occured",
            error_type: "Error",
            data: error?.message,
        });
    }
})

module.exports = verifyToken