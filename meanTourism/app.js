const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const mongoose=require("mongoose");
const db = require("./api/data/db");
const router = require("./api/routes")



app.use(function(req, res, next){
    console.log(req.url,req.ip,req.method,req.time);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

 

const server=app.listen(process.env.PORT,function(req, res){
    console.log("Listening to port ",server.address().port);
});

app.use("/api",router);