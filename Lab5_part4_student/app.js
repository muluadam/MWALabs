const express = require("express");
const dotenv = require("dotenv").config();
require("./api/data/db");
const router=require("./api/routes");
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));

 

app.use(function(req, res, next){
    console.log(req.url,req.ip,req.method,req.time);
    next();
});

//conn.open();
//app.use(express.static(path.join(__dirname,"public")));

const server=app.listen(process.env.PORT,function(req, res){
    console.log("Listening to port ",server.address().port);
});

app.use("/api",router);