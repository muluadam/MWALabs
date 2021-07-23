const express = require("express");


const dotenv = require("dotenv").config();
const router=require("./api/routes");
const app = express();

var conn=require("./api/data/dbconnection.js");

app.use(function(req, res, next){
    console.log(req.url,req.ip,req.method,req.time);
    next();
});

conn.open();
//app.use(express.static(path.join(__dirname,"public")));

const server=app.listen(process.env.PORT,function(req, res){
    console.log("Listening to port ",server.address().port);
});

app.use("/api",router);