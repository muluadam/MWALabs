
const express = require("express");
const dotenv=require("dotenv").config();
const path = require("path");
const router= require("./api/routes");

const app = express();


//app.use(express.static( process.env.PUBLIC_FOLDER));
/**
 * Settup  a global  middleware  
 */

app.use(function(req, res, next){
    console.log(req.method,req.url,req.time);
    next();
})

app.use(express.static(path.join(__dirname,"public")));

/**
 * Listeen to port no set in the .env file
 */
const server=app.listen(process.env.PORT,function(req, res){
    console.log("Listening to port", server.address().port);
});

/**
 *  user a route
 */
app.use("/api",router);