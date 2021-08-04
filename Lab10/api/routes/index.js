const express = require('express');
const router=express.Router();
const gameController=require("../controller/game.controller");
const publisherController=require("../controller/publisher.controller")
const reviewController=require("../controller/review.controller")
const userController=require("../controller/user.controller")
 
router.route("/")
.get(gameController.getAll)
router.route("/game")
.get(gameController.getAll) 

router.route("/game") 
.post(gameController.addOneGame)

router.route("/game/:gameId")
.get(userController.authenticate,gameController.getOne)
.delete(userController.authenticate,gameController.deleteOne)
.patch(userController.authenticate,gameController.updatePartial)
 


router.route("/game/:gameId/publishers")
.get(publisherController.getPublishers)
.patch(publisherController.updatePublisher)

router.route("/game/publisher/nearby").get(publisherController.getNearbyPublisher)

router.route("/game/:gameId/reviews")
.get(reviewController.getAll)
.post(reviewController.addReview)


router.route("/game/:gameId/reviews/:reviewId")
.get(reviewController.getOne)
// router.route("/game/:gameId/review").post(reviewController.getAll)

router.route("/user/register").post(userController.register)
router.route("/user/").get(userController.getAll)
router.route("/user/login").post(userController.login)
module.exports=router;
