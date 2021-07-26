const express = require("express");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.reviewsGetAll = function (req, res) {
    console.log("reviewsGetAll Get All");
    const gameId = req.params.gameId;
    console.log("GAme Id=" + gameId);
    Game.findById(gameId).select('reviews').exec(function (err, game) {
        const response = {
            status: 200,
            message: {}
        };
        if (err) {
            console.log(err);
            console.log("Error Error");
            response.status = 500;
            conslo
            response.message = err;
        }
        if (!game) {
            console.log("404: Error finding game");
            response.status = 404;
            response.message = { message: "Game not found" };
        } else {
            console.log("game==" + game);
            response.message = game.reviews;
        }
        res.status(response.status).json(game);

    });

}





const _addreviews = function (req, res, game) {
    console.log("Adding review");
    console.log("From Body ", req.body.name);
    const newreview = {
        name: req.body.name,
        review: req.body.review,
    }
    // game.reviews.name = req.body.name;
    //     game.reviews.review=req.body.review;
    //     game.reviews.date=req.body.date;

    Game.findOneAndUpdate({ _id: game._id }, {
        $push: { review: newreview },
        new: true,
        upsert: true,
        rawResult: true,
        useFindAndModify:true
    },
        function (error, success) {
            if (error) {
                console.log(error);
                res.status(500).json(error);
            } else {
                console.log(success);
                res.status(200).json(success);
            }
        });

    // game.save(function (err, updatedGame) {
    //     const response = {
    //         status: 200,
    //         message: []
    //     };

    //     if (err) {
    //         response.status = 500;
    //         response.message = err;
    //     } else {
    //         response.status = 201;
    //         response.message = updatedGame.reviews;
    //     }
    //     res.status(response.status).json(response.message);

    // });
}
/**
 *   
 * @param {*} req 
 * @param {*} res 
 */
module.exports.reviewsAddOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Game Id=" + gameId);

    Game.findById(gameId).exec(function (err, game) {
        const response = { status: 200, message: [] };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("Game id not found in database", gameId);
            response.status = 404;
            response.message = { "message": "Game ID not found" + gameId };
        }
        if (game) {
            _addreviews(req, res, game);

        } else {
            res.status(response.status).json(response.message);
        }

    });


}
const _updatereviews = function (req, res, game) {

    game.review.name = req.body.name;
    game.review.review = req.body.review;
    game.review.date = req.body.date;

    game.save(function (err, updateGame) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); response.status = 500; response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewsFullUpdateOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("-reviewss").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); response.status = 500; response.message = err;
        } else if (!game) {
            response.status = 404; response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _updatereviews(req, res, game);
        }
    });

};
module.exports.reviewsPartialUpdateOne = function (req, res) {
    console.log("gamesFullUpdate");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviewss -reviews").exec(function (err, game) {
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
            game.review.name = req.body.name;
            game.review.review = req.body.review;
            game.review.date = req.body.date;

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

const _deletereviews = function (req, res, game) {
    game.reviews.remove();
    game.save(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); response.status = 500; response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.reviewsDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("-reviewss").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); response.status = 500; response.message = err;
        } else if (!game) {
            response.status = 404; response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _deletereviews(req, res, game);
        }
    });

};