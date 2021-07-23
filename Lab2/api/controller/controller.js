const express = require("express");
const gameData=require("../resources/games.json");

module.exports.getAll=function(req,res){
    res.status(200).json(gameData);
}

module.exports.getOne=function(req,res){
   
    const gameId=req.params.gameId;
    console.log("GameId="+gameId)
    const selectedGame=gameData[gameId]
    res.status(200).json(selectedGame);
}

module.exports.add=function(req,res){
    let n1=req.params.number1;
    let n2=req.query.number2;
    console.log(parseInt(n2)+parseInt(n1));
       res.status(200).json({"Sum":parseInt(n2)+parseInt(n1)});
    
    }

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