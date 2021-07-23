const express = require("express");

const meanGameController=require("../controller/games.controller");
 
const router= express.Router();

router.route("/getGamesWithCount").get(meanGameController.getWithCount)

router.route("/games").get(meanGameController.getAll)

router.route("/games/:gameId").get(meanGameController.getOne) 
 

module.exports = router;