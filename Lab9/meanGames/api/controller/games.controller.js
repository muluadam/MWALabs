const express = require("express");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");
module.exports.getWithCount = function (req, res) {
    // console.log("Game Get All");
    // Game.find().exec(function (err, games) {
    //     res.status(200).json(games);
    // });

}

module.exports.getAll = function (req, res) {

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

    Game.findById(gameId).exec(function (err, game) {
        res.status(200).json(game);
    });

}
/**
 *  Add Assync before the function  module.exports.gamesAddOne=    function(req,res){ 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.gamesAddOne = function (req, res) {
    console.log("Game AdeOne");

    console.log("title=" + req.body.title);
    Game.create({
        title: req.body.title,
        year: parseInt(req.body.year),
        price: parseFloat(req.body.price),
        designer: req.body.designer,
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        rate: parseFloat(req.body.rate)
    },
        function (err, game) {
            if (err) {
                console.log("Errir Creating Games" + err);
                res.status(400).json(err)
            } else {
                console.log("Game created", game)
                res.status(201).json(game);
            }
        });

}

module.exports.gamesFullUpdateOne = function (req, res) {
    console.log("gamesFullUpdate");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            response.status = 500;
            response.message = err
        }
        if (!game) {
            response.status = 204;
            response.message = { "message": "Game  not Found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message)
        } else {
            game.title = req.body.title;
            game.year = parseInt(req.body.year);
            game.price = parseFloat(req.body.price);
            game.minAge=parseInt(req.body.minAge);
            game.designer = req.body.designer;
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.rate = parseFloat(req.body.rate);
             game.minAge = parseInt(req.body.minAge);
            game.save(function (err, updatedGame) {
                if (err) {


                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message)
            });
        }

    });

};
module.exports.gamesPartialUpdateOne = function (req, res) {
    console.log("gamesFullUpdate");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            response.status = 500;
            response.message = err
        }
        if (!game) {
            response.status = 204;
            response.message = { "message": "Game  not Found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message)
        } else {
            game.title = req.body.title;
            game.year = parseInt(req.body.year);
            game.price = parseFloat(req.body.price);
            game.designer = req.body.designer;
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.rate = parseFloat(req.body.rate); game.minAge = parseInt(req.body.minAge);
            game.save(function (err, updatedGame) {
                if (err) {


                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message)
            });
        }

    });

};

//gamesDeleteOne
module.exports.gamesDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
        const response = { status: 204 };
        if (err) {
            console.log("Error  Finding game");
            response.status = 500;
            response.message = err;
        }
        if (!deletedGame) {
            response.status = 404;
            response.message = { message: "Game Id not Found" };
        }
        res.status(response.status).json(response.message);
    });
};