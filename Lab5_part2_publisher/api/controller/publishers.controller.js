const express = require("express");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetAll = function (req, res) {
    console.log("publisherGetAll Get All");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = {
            status: 200,
            message: []
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
        if (!game) {
            console.log("Error finding game");
            response.status = 404;
            response.message = { message: "Game not found" };
        } else {
            console.log("Error finding game");

            response.message = game.publisher ? game.publisher : [];
        }
        res.status(response.status).json(response.message);

    });
    // Game.find().exec(function (err, games) {
    //     res.status(200).json(games);
    // });

}



module.exports.publisherGetOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("gameId=" + gameId)

    Game.findById(gameId).exec(function (err, game) {
        res.status(200).json(game);
    });

}

const _addPublisher = function (req, res, game) {

    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
    ];
    game.save(function (err, updatedGame) {
        const response = {
            status: 200,
            message: []
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedGame.publisher;
        }
        res.status(response.status).json(response.message);

    });
}
/**
 *   
 * @param {*} req 
 * @param {*} res 
 */
module.exports.publisherAddOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Game Id=" + gameId);

    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 200, message: [] };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("Game id not found in database", id);
            response.status = 404;
            response.message = { "message": "Game ID not found" + gameId };
        }
        if (game) {
            _addPublisher(req, res, game);

        } else {
            res.status(response.status).json(response.message);
        }

    });


}
const _updatePublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function (err, updateGame) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); response.status = 500; response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherFullUpdateOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("-reviews").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); response.status = 500; response.message = err;
        } else if (!game) {
            response.status = 404; response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _updatePublisher(req, res, game);
        }
    });

};
module.exports.publisherPartialUpdateOne = function (req, res) {
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

const _deletePublisher = function (req, res, game) {
    game.publisher.remove();
    game.save(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); response.status = 500; response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.publisherDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("-reviews").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); response.status = 500; response.message = err;
        } else if (!game) {
            response.status = 404; response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _deletePublisher(req, res, game);
        }
    });

};