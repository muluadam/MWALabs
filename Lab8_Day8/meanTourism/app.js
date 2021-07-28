const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const mongoose=require("mongoose");
const db = require("./api/data/db");
const router = require("./api/routes")
const path=require("path")



app.use(function(req, res, next){
    console.log(req.url,req.ip,req.method,req.time);
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));
app.use(express.static(path.join(__dirname,"public")));



 

const server=app.listen(process.env.PORT,function(req, res){
    console.log("Listening to port ",server.address().port);
});

app.use("/api",router);




