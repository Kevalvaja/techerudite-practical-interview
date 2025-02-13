const db = require("../db/dbConnection");

const queryExcuter = async (q, values) => {
    if (values) {
        return new Promise((resolve, reject) => {
            db.query(q, values, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            db.query(q, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
};

module.exports = { queryExcuter }