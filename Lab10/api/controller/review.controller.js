const mongoose = require('mongoose');
const Game = mongoose.model("Game")
const log=console.log;
const ObjectId=mongoose.Types.ObjectId;
module.exports.getAll = function (req, res) {
    const gameId = req.params.gameId;
    log("gameId", gameId)
    const response = { status: 200 }
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        if (err) {
            log("err",err)
            response.status = 500;
            response.message = err;
        }
        if (!game) {
            log("Game not found")
            response.status = 404
            response.message = { message: "Game Not Found" }
        }
        if (game) {
            log("Game found")
            response.message = game
        }
        res.status(response.status).json(response.message);
    })
}
module.exports.addReview = function (req, res) {
    const gameId = req.params.gameId;
    log("gameId", gameId)
    const response = { status: 200 }
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        if (err) {
            log(err)
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);
            return
        }
        if (!game) {
            response.status = 404
            response.message = { message: "Game Not Found" }
            res.status(response.status).json(response.message);
            return
        }
        if (game) {
            //  response.message = game
            _addReview(req, res, game);
        }

    })
}

function _addReview(req, res, game) {
    log("_addReview")
    const response = { status: 201 }
    if (!(req.body.name && req.body.rating && req.body.review)) {
        response.status = 400,
            response.message = { message: "All Filds are required" }
    } else {
        const reviewdata = {
            name: req.body.name,
            rating: parseFloat(req.body.rating),
            review: req.body.review,
            createdDate: Date.now(),
           // _id: ObjectId()
        }
        log("review==",reviewdata)
        Game.findOneAndUpdate({_id:game._id},
             { $push: { reviews:reviewdata },
            new:true,
            upsert:true,
            useFindAndModify:true,
            rawResult:true
            }, function (err, updatedGame) {
            if (err) {
                log("update err",err)
                response.status = 500,
                    response.message = { message: "All Filds are required" }
            } 
            
            else {
                log("updatedGame",updatedGame)
                response.status = 500,
                    response.message = { message: updatedGame }
            }
            res.status(response.status).json(response.message);

        })

    }
}


module.exports.getOne=function(req,res){
    log("GetOne Called")
    const reviewId=req.params.reviewId;
    const gameId=req.params.gameId; 
    log("gameId", gameId)
    log("reviewId", reviewId)
    const response = { status: 200 }
    Game.findById({_id:gameId,"reviews._id":reviewId})
    
    .select("reviews").exec(function (err, game) {
        if (err) {
            log("err",err)
            response.status = 500;
            response.message = err;
        }
        if (!game) {
            log("Game not found")
            response.status = 404
            response.message = { message: "Game Not Found" }
        }
        if (game) {
            log("Game found")
            response.message = game
        }
        res.status(response.status).json(response.message);
    })

}
module.exports.updateReview=function(req,res){
    log("updateReview")
    const reviewId=req.params.reviewId;
    const response = { status: 201 }
    if (!(req.body.name && req.body.rating && req.body.review)) {
        response.status = 400,
            response.message = { message: "All Filds are required" }
    } else {
        const newreview = {
            name: req.body.name,
            rating: parseFloat(req.body.rating),
            review: req.body.review,
            createdDate: Date.now(),
           // _id: ObjectId()
        }
        Game.findByIdAndUpdate({_id:gameId,"reviews._id":reviewId},{$set:{reviews:newreview}}) 
        //Game.findByIdAndUpdate({_id:gmae._id, reviews._id:reviewId},{})
}

}