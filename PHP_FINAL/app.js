require ("dotenv").config();
require("./api/data/db.js");

const path = require("path");
const express = require("express");
const routes = require("./api/routes/index.js");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use("/api", routes);

const server = app.listen(process.env.SERVER_PORT, function(){
    console.log("Listening to port " + server.address().port);
});