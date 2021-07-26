const express = require('express');
const mongoose = require("mongoose");
const Visitor = mongoose.model("Visitor");
const validator = require("validator");
const log = console.log;

module.exports.visitorsGetAll = function (req, res) {
    const count = 5;
    const offset = 0;
    if (req.query && req.query.offset) {
        offset = req.query.offset;
    }
    if (req.query && req.query.count) {
        count = req.query.count;
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ message: "Offset and Count are not Numbers" })
        return;
    }

    const maxCount = 10;
    if (count > maxCount) {
        res.status(400).json({ message: "Rquesting more than your limit Numbers" })
        return;
    }


    Visitor.find()
        .limit(count)
        .skip(offset)
        .exec(function (err, visitor) {
            console.log("Foound Visitors=" + visitor);
            res.status(200).json(visitor);
        })


    log("visitorsGetAll");
}
module.exports.visitorsAddOne = function (req, res) {
    log("VisitorAddOne")
    if (!validator.isEmail(req.body.email)) {
        log("Error", "Invalid Email ")
        res.status(500).json({ message: "Invalid Email " });
        return;
    }
    Visitor.create({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, function (err, result) {
        if (err) {
            log("Error", err)
            res.status(500).json(err);
        } else {
            log("Visitor Aded");
            res.status(201).json(result);
        }

    })



}
module.exports.visitorsGetOne = function (req, res) {
    const visiorId = req.params.visitorId;
    log("visitorsGetOne");
    Visitor.findById(visiorId)
        .exec(function (err, visitor) {
            const response = { status: 200 };
            if (err) {
                response.status = 400;
                response.message = { message: " Visitor Id not Found" }
            }
            else{
                response.message=visitor;
            }
            res.status(response.status).json(response.message);
        })

   
}

 
module.exports.visitorsPartialUpdateOne = function (req, res) {
    log("visitorsPartialUpdateOne");
    const visitorId=req.params.visitorId;
  log("visitorsFullUpdateOne");
   Visitor.findOneAndUpdate(visitorId).exec(function(err,visitor){
        const response={status:204}
        if(err){
            log("Error Updateing Visitor",err)
            response.status=500;
            response.message=err;
        }
        if(!visitor){
            log("Error Saving , Site not found site")
            response.status=400;
            response.message={message:" Site with the Id not found"}
        }

        if(response.status!=204){
            log("Error Saving ,checking response status")
            res.status(response.status).json(response.message);
            return;
       
        }else{
           
            if(req.body.email){visitor.email=req.body.email;}
                if(req.body.name){ visitor.name=req.body.name;}
                    if(req.body.country){visitor.country=req.body.country;}


            visitor.save(function(err, result){
                log("Updating Vsitor")
                if(err){
                    log("Error-updateing"+err)
                    response.status=500;
                    response.message=err;
                }else{
                    log(result)
                   response.message=result;
                }
                res.status(response.status).json(response.message);
        
            });        
    }
   });
}

module.exports.visitorsFullUpdateOne = function (req, res) {
const visitorId=req.params.visitorId;
  log("visitorsFullUpdateOne");
   Visitor.findOneAndUpdate(visitorId).exec(function(err,visitor){
        const response={status:204}
        if(err){
            log("Error Updateing Visitor",err)
            response.status=500;
            response.message=err;
        }
        if(!visitor){
            log("Error Saving , Site not found site")
            response.status=400;
            response.message={message:" Site with the Id not found"}
        }

        if(response.status!=204){
            log("Error Saving ,checking response status")
            res.status(response.status).json(response.message);
            return;
       
        }else{
            visitor.email=req.body.email;
            visitor.name=req.body.name;
            visitor.country=req.body.country;


            visitor.save(function(err, result){
                log("Updating Vsitor")
                if(err){
                    log("Error-updateing"+err)
                    response.status=500;
                    response.message=err;
                }else{
                    log(result)
                   response.message=result;
                }
                res.status(response.status).json(response.message);
        
            });        
    }
   });
}

module.exports.visitorsDeleteOne = function (req, res) {
    log("visitorsDeleteOne");
    const visitorId = req.params.visitorId;
    Visitor.findByIdAndDelete(visitorId).exec(function (err, deletedVisitor) {
        const response = { status: 204 };
        if (err) {
            console.log("Error  Finding Visor");
            response.status = 500;
            response.message = err;
        }
        if (!deletedVisitor) {
            response.status = 404;
            response.message = { message: "visitorId Id not Found" };
        }
        res.status(response.status).json(response.message);
    });
}


