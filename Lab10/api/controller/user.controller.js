const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const log = console.log
module.exports.register = function (req, res) {
    log("register User")
    const response = { status: 201 }
    const {
        username, name, password
    } = req.body

    if (!(username && password && name)) {

        res.status(400).send("All input is required");
    }

    const oldUser = User.findOne({ username }, function (err, user) {
        if (err) {
            response.message = "REgistraiogn fialed"
            return res.status(409).send(response.message);
        }
        if (user) {
            response.message = "Username allready Taken"
            return res.status(409).send(response.message);
        }
        if (!user) {
            bcrypt.hash(password, 10, function (err, hashedPassword) {
                const use = User.create({ name, username, password: hashedPassword }, function (err, user) {
                    if (err) {
                        log(err)
                        response.status = 500
                        response.message = err
                    } else {
                        response.status = 201
                        response.message = user
                    }
                    res.status(response.status).json(response.message)
                })
            });


        }
    })





}

module.exports.login = function (req, res) {
    log("Login User")
    log("register User")
    const response = { status: 201 }
    const {
        username, password
    } = req.body

    if (!(username && password)) {

        response.message = "Enter all Fields"
        return res.status(400).send(response.message);
    }
const usr={}

User.findOne({username}).exec(function(err,user){
  
    
    if (err) {
        response.message = "REgistraiogn fialed"
        return res.status(500).send(response.message);
    }
    if (!user) {
        response.message = "User not Authorized"
        return res.status(401).send(response.message);
    }
    if(user){
        usr.name=user.name;

        bcrypt.compare(password,user.password, function(err,success){
            response.message = {user:user};
         jwt.sign(
             {username:user.username},
             process.env.TOKEN_KEY,  {
                expiresIn: "2h",
              },
              function(err, token) {
            log("err===>",err)    
            console.log(token); 
                response.message = {token:token,user:usr};
                return res.status(200).send(response.message);
              });
           
        })
    }
})

}
module.exports.getAll = function (req, res) {
    User.find().exec(function (err, users) {
        return res.status(200).json(users)
    })
}

module.exports.authenticate=function(req,res,next){
    const headerExists=req.headers.authorization;
  
    if(headerExists){
        log("headerExists,",headerExists)
const token=req.headers.authorization.split(" ")[1];
jwt.verify(token,process.env.TOKEN_KEY,function(err,decodedKey){
    if(err){
        log("JWt veryfy error ",err)
        res.status(401).json({message:"Unauthorized"})
    }else{
        next()
    }
})

    }
}