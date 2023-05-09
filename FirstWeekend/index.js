require ("dotenv").config();
const path = require("path");
const express = require("express");
const routes = require("./api/routes");

const app = express();

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", routes);
app.use("/api", routes); //subset routes

const server = app.listen(process.env.SERVER_PORT, function(){
    console.log("Listening to port " + server.address().port);
});