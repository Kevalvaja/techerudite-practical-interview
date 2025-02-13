const jwt = require("jsonwebtoken");

module.exports = {
    fetchId: async (token) => {
        if(token) {
            const userData = jwt.decode(token);
            return userData?.user_id
        }
    },
    fetchRole: async (token) => {
        if(token) {
            const userData = jwt.decode(token);
            return userData?.user_role
        }
    }
}