const express = require("express");

const meanGameController=require("../controller/games.controller");
 
const router= express.Router();

router.route("/getGamesWithCount").get(meanGameController.getWithCount);

router.route("/games")
    .get(meanGameController.getAll)
    .post(meanGameController.gamesAddOne);
   
   

router.route("/games/:gameId")
.get(meanGameController.getOne)
.put(meanGameController.gamesFullUpdateOne)
.patch(meanGameController.gamesPartialUpdateOne)
.delete(meanGameController.gamesDeleteOne);
 

module.exports = router;