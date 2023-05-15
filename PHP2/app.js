
require ("dotenv").config();
require("./api/data/db");
const express = require("express");
const path = require("path");
const routes=require("./api/routes");
const app = express();

app.use(function(req, res, next){
    console.log(req.method, req.url);
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type, Accept');
    res.append('Access-Control-Allow-Methods', 'DELETE');
    next();
});

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api", routes);
const server = app.listen(process.env.SERVER_PORT, function(){
    console.log("listening to port ", process.env.SERVER_PORT);
});

