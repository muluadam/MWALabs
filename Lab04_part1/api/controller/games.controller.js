const express = require("express");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");
module.exports.getAll = function (req, res) {
    Game.find().exec(function (err, games) {
     res.status(200).json(games);
    });

}

module.exports.getWithCount = function (req, res) {

    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        if (parseInt(req.query.count) <= 7) {
            count = parseInt(req.query.count);
        }
    }

    Game.find().limit(count).skip(offset).exec(function (err, game) {
        console.log("Foound game=" + game);
        res.status(200).json(game);
    });
}

module.exports.getOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("gameId=" + gameId)
  
    Game.findById(gameId).exec(function(err, game) {
        res.status(200).json(game);
        });

}

 