const express = require('express');
const dotenv = require("dotenv").config()
require("./api/db/db");
require("./api/db/game.model");
require("./api/db/user.model")
const path= require("path")
const router=require("./api/routes")


const app= express();
const log=console.log;
app.use(function (req, res, next){
  log(req.method,req.path)
  next();
})

app.use("/node_modules",express.static(path.join(__dirname,"node_modules")))
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.urlencoded({extended:true}));

const server=app.listen(process.env.PORT, () => {
  console.log(`Server started on port`,server.address().port);
});

app.use("/api",router)


