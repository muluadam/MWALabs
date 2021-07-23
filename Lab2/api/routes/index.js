const express = require("express");

const meanGameController=require("../controller/controller");
 

const router= express.Router();

 
 

router.route("/games").get(meanGameController.getAll)

router.route("/game/:gameId").get(meanGameController.getOne)

router.route("/add/:number1").get(meanGameController.add)

module.exports = router;