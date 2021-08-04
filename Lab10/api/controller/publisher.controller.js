const express = require('express');
const mongoose = require("mongoose")
const Game = mongoose.model("Game")
const log = console.log;
module.exports.getPublishers = function (req, res) {
    const gameId = req.params.gameId;
    log("gameId", gameId)
    const response = { status: 200 }
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        if (!game) {
            response.status = 404
            response.message = { message: "Game Not Found" }
        }
        if (game) {
            response.message = game
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.updatePublisher = function (req, res) {
    log("updatepublisher called")
    const gameId = req.params.gameId;
    log("gameId", gameId)
    const response = { status: 200 }
    log("name=", req.body.name)
    log("Lng,", req.body.lng)
    log("lat", req.body.lat)

    Game.findById(gameId).select("publisher").exec(function (err, game) {
        if (err) {
            log("err", err)
            response.status = 500;
            response.message = err;
        }
        if (!game) {
            log("game not found")
            response.status = 404
            response.message = { message: "Game Not Found" }
        }
        if (game) {
            // game.publisehr={
            //     location:{
            //         coordinates:[ parseFloat(req.body.lng),parseFloat(req.body.lat)]
            //     },
            //     name:req.body.name
            // }
            game.publisher.name = req.body.name
            game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            log("NG", game)
            game.save(function (error, updatedgame) {
                if (err) {
                    log("error", error)
                    response.status = 500
                    response.message = error
                } else {
                    log("game Updated", updatedgame)
                    response.status = 200
                    response.message = updatedgame
                }
                res.status(response.status).json(response.message);
            })

        }
    })
}

module.exports.getNearbyPublisher = function (req, res) {
    log("getNearbyPublisher called")
    const lng = req.query.lng;
    const lat = req.query.lat;
    log("Lng=",lng)
    log("Lat,",lat)
    const response = { status:200 }
    const query = {
        "publisher.location.coordinates": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: 1000000,
                $minDistance: 0
            }
        }
    };
log("Query==",query)
    Game.find(query).exec(function (error, game) {

        if (error) {
            log("Error",error)
            response.status = 500;
            response.message = error;
        } else {
            log("game is ",game)
            response.message = game
        }
        res.status(200).json(response.message)
    })


}

