 
const mongoose = require("mongoose")
const Game= mongoose.model("Game");
const log=console.log;
module.exports.getAll=function(req,res){
    let count=5;
    let offset=0
    let maxCount=10;

    const response={
        status:200
    }
    if(req.query && req.query.count){
        count=req.query.count;
    }
    if(req.query && req.query.offset){
        offset=req.query.offset;
    }
    if(isNaN(offset)||isNaN(count)){
        response.status=400
        response.message={message:"Request bad Offset"}
res.status(response.status).json(response.message)
return;
    }
    if(count>maxCount){
        response.status=400
        response.message={message:"Request limit exceded "}
res.status(response.status).json(response.message)
return;
    }

    Game.find().limit(count).skip(offset)
    .exec(function(err,games){
        if(err){
            response.status=500
        response.message={message:err}
    }
    if(!games){
        response.status=404
        response.message={message:"Request Not Found "}
 
    }
    if(games){
        response.status=200
        response.message=games

    }
    res.status(response.status).json(response.message)
    })
  
} 
module.exports.getOne=function(req,res){
    const gameId=req.params.gameId;
    log("GameID=",gameId);
    Game.findById(gameId).exec(function(err,game){
        const response={
            status:200
        }
        if(err){
            response.status=500
            response.message=err
        }
        if(!game){
            response.status=404
            response.message="Game Not found"
        }
        if(game){
            response.status=200
            response.message=game
        }
        res.status(response.status).json(response.message);
    }) 

}

module.exports.deleteOne=function(req,res){
    log("deleteOne called")
const gameId=req.params.gameId;
const response={
    status:200
}
Game.findByIdAndDelete(gameId).exec(function(err){
    if(err){
    response.status=500
    response.message=err
    } else{
        response.status=200
    response.message="Game deleted"
    }
res.status(response.status).json(response.message);

})

}

module.exports.updatePartial=function(req,res){
    log("updatePartial")
    const gameId=req.params.gameId;
    log("GameID=",gameId)
    log("bodyr",req.body)
    const response={
        status:200
    }

    Game.findById(gameId).exec(function (err,game){
        if(err){
            log("err",err)
            response.status=500
            response.message=err;
        }
        if(!game){
            log("game  not found")
            response.status=404
            response.message="game Not Found";
        }
        if(game){
           // log("game found",game)
log(req.body.title)
              if(req.body.title){
                  game.title=req.body.title
              }
              if(req.body.year){
                  game.year=req.body.year
              }
              if(req.body.price) game.price=req.body.price
              if(req.body.minPlayers){game.minPlayers=req.body.minPlayers}
              if(req.body.maxPlayers)game.maxPlayers=req.body.maxPlayers
              if(req.body.minAge)game.minAge=req.body.minAge;

              game.save(function(err,updatedGame){
                  log("saving ")
                  if(err){
                      log("save Err")
                      response.status=500
                      response.message=err
                  }
                  else{
                      log("Updated Game",updatedGame)
                      response.status=200
                      response.message=updatedGame
                  }
res.status(response.status).json(response.message);

              })

        }
    })
}

module.exports.addOneGame=function(req,res){
    log("addOneGame called")
    const response={status:201}
    const newgame={}

newgame.title=req.body.title
newgame.rate=req.body.rate
newgame.designers=[]
newgame.reviews=[]
newgame.price=parseFloat(req.body.price)
newgame.year=parseInt(req.body.year)
newgame.minPlayers=parseInt(req.body.minPlayers)
newgame.maxPlayers=parseInt(req.body.maxPlayers)
//newgame.publisher={}
newgame.minAge=parseInt(req.body.minAge)
log("NewGame",newgame)
Game.create(newgame,function(err,game){
    log("game-=",game)
    log("err",err)
    if(err){
        log(Error)
        response.status=500
        response.message=err

    }
else{
    response.message=game
    
    }
    res.status(response.status).json(response.message)
})

}