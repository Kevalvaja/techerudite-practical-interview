const express = require("express");
const cors = require("cors");
const config = require("./configs/config");
const privateRouter = require("./routers/privateApiEndPoint.js");
const verifyToken = require("./middleware/authMiddleware.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/userLogin', require('./routers/publicRouter/user-login-router'));

app.use('/', verifyToken, privateRouter);

const PORT = config.PORT
app.listen(PORT, () => {
    console.log(`Backend Runing on PORT ${PORT}`)
})