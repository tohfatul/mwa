require ("dotenv").config();
//require("./api/data/dbconnection.js").open();
require("./api/data/db.js");
const bp = require('body-parser');

const path = require("path");
const express = require("express");
const routes = require("./api/routes/index.js");
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routes);

const server = app.listen(process.env.SERVER_PORT, function(){
    console.log("Listening to port " + server.address().port);
});