const express = require("express");
const dotenv = require("dotenv").config();
require("./api/data/db");
const router=require("./api/routes");
const app = express();




//var conn=require("./api/data/dbconnection.js");

app.use(function(req, res, next){
    console.log(req.url,req.ip,req.method,req.time);
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.param('title', function (req, res, next, id) {
// console.log("REa=="+req.body);
//     Post.findById(id, function (err, post) {
//       if (err) return next(err);
//       if (!post) return next('route');
//       req.post = post;
//     });
  
//   });
//conn.open();
//app.use(express.static(path.join(__dirname,"public")));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const server=app.listen(process.env.PORT,function(req, res){
    console.log("Listening to port ",server.address().port);
});

app.use("/api",router);