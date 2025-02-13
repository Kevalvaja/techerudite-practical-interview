const config = require('../configs/config');
const db = require('../db/dbConnection');
const decodeToken = require('../helpers.js/decodeToken');
const { queryExcuter } = require('../helpers.js/queryExecuter');
const jwt = require("jsonwebtoken");


const getData = async (req, res) => {
    try {
        const q = `SELECT * FROM user_registration`;
        const userData = await queryExcuter(q)
        if (userData) {
            return await res?.status(200)?.json({
                status: 200,
                message: "Get all user data",
                error_type: "Success",
                data: userData,
            });
        }
    } catch (error) {
        return await res?.status(400)?.json({
            status: 400,
            message: "Error Occured",
            error_type: "Error",
            data: error?.message,
        });
    }
}

const getDataById = async (req, res) => {
    try {
        const q = `SELECT * FROM user_registration WHERE user_id = ${req?.params?.id}`;
        const userData = await queryExcuter(q)
        if (userData) {
            return await res?.status(200)?.json({
                status: 200,
                message: "Get specific user data",
                error_type: "Success",
                data: userData?.[0],
            });
        }
    } catch (error) {
        return await res?.status(400)?.json({
            status: 400,
            message: "Error Occured",
            error_type: "Error",
            data: error?.message,
        });
    }
}

const userRegistration = async (req, res) => {
    try {
        const checkEmailQ = `SELECT user_email FROM user_registration WHERE user_email = '${req?.body?.user_email}'`
        const existintEmail = await queryExcuter(checkEmailQ)
        if (existintEmail) {
            return await res?.status(200)?.json({
                status: 409,
                message: "This email id is already exist",
                error_type: "Conflict",
                data: existintEmail?.[0],
            });
        }

        const q = `INSERT INTO user_registration(user_first_name, user_last_name, user_email, user_password, user_role, status, entry_date, entry_by, entry_role) VALUES (?)`
        const values = [
            req?.body?.user_first_name,
            req?.body?.user_last_name,
            req?.body?.user_email,
            req?.body?.user_password,
            req?.body?.user_role,
            req?.body?.status || 1,
            new Date(),
            decodeToken?.fetchId(req?.headers["authorization"]) || 1,
            decodeToken?.fetchRole(req?.headers["authorization"]) || 1,
        ]
        const newData = queryExcuter(q, [values])
        if (newData) {
            return await res?.status(201)?.json({
                status: 201,
                message: "User has been added successfully...",
                error_type: "Success",
                data: data,
            });
        }
    } catch (error) {
        return await res?.status(400)?.json({
            status: 400,
            message: "Error Occured",
            error_type: "Error",
            data: error?.message,
        });
    }
}

const userLogin = async (req, res) => {
    try {
        const checkEmailQ = `SELECT user_id, user_role, user_password, user_email FROM user_registration WHERE user_email = '${req?.body?.emailId}'`;
        const getEmail = await queryExcuter(checkEmailQ);
        if (getEmail?.length !== 0) {
            const { user_id, user_role, user_email, user_password } = getEmail?.[0]
            if (user_password != req?.body?.password) {
                return await res?.status(404)?.json({
                    status: 404,
                    message: "Invalid Password",
                    error_type: "Error",
                    data: {},
                });

            } else if (user_role != 1) {
                return await res?.status(404)?.json({
                    status: 400,
                    message: "You are not allowed to login from here",
                    error_type: "Error",
                    data: {},
                });
            } else {
                const jwtToken = jwt.sign({ user_id: user_id, user_role: user_role }, config.WEBTOKENSCREETKEY)
                return await res?.status(200)?.json({
                    status: 200,
                    message: "Login Successfully...",
                    error_type: "Success",
                    data: jwtToken,
                });
            }
        } else {
            return await res?.status(404)?.json({
                status: 404,
                message: "Invalid Email Address",
                error_type: "Error",
                data: {},
            });
        }
    } catch (error) {
        return await res?.status(400)?.json({
            status: 400,
            message: "Error Occured",
            error_type: "Error",
            data: error?.message,
        });
    }
}


module.exports = { getData, getDataById, userRegistration, userLogin }