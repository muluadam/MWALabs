const express = require("express");
 
const  dbConnection=  require("../data/dbconnection.js");
//var  db= dbConnection.get();
//console.log("db",  db);
 //var collection= db.collection("games");

module.exports.getAll=function(req,res){
   // res.status(200).json(gameData);
   var  db= dbConnection.get();
   const collection = db.collection("games");
   collection.find().toArray(function(err,docs){
       console.log(docs);
       res.status(200).json(docs);
   });

}

module.exports.getWithCount=function(req,res){
    // res.status(200).json(gameData);
    var  db= dbConnection.get();
    const collection = db.collection("games");
var offset=0;
var count =7;
if(req.query && req.query.offset){
    offset=parseInt(req.query.offset,10);
}
if(req.query && req.query.count){
    if(parseInt(req.query.count)<=7){
count=parseInt(req.query.count);
    }
}
    collection.find()
    .skip(offset)
    .limit(count)
    .toArray(function(err,docs){
        console.log(docs);
        res.status(200).json(docs);
    });
 
 }
 
module.exports.getOne=function(req,res){
    var  db= dbConnection.get();
    const collection = db.collection("games");

    const gameTitle=req.params.gameTitle;
    console.log("gameTitle="+gameTitle)
   // const selectedGame=gameData[gameId]
   collection.findOne({title:gameTitle},function(err, game){
    res.status(200).json(game);
   });
    
}

// module.exports.add=function(req,res){
//     let n1=req.params.number1;
//     let n2=req.query.number2;
//     console.log(parseInt(n2)+parseInt(n1));
//        res.status(200).json({"Sum":parseInt(n2)+parseInt(n1)});
    
//     }

/*
const getAllGames=function(req,res){
    console.log("Getting all games")
    console.log(gameData);
   // res.json()
    res.status(200).json({"success":true});
}

module.exports={
    getAll:getAllGames
}
*/