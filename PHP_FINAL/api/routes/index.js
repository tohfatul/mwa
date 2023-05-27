const express = require("express");
const router = express.Router();

const travelsRoute = require("../routes/travels");
const usersRoute = require("../routes/users");

router
.use("/travels", travelsRoute)
.use("/users", usersRoute);


module.exports = router;
