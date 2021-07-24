const express = require("express");

const meanGameController=require("../controller/games.controller");
const publisherController=require("../controller/publishers.controller");
const reviewsController= require("../controller/reviews.controller");
 
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
 



router.route("/games/:gameId/publisher")
    .get(publisherController.publisherGetAll)
    .put(publisherController.publisherFullUpdateOne)
    .delete(publisherController.publisherDeleteOne)
    .post(publisherController.publisherAddOne);


 
    router.route("/games/:gameId/review")
    .get(reviewsController.reviewsGetAll)
    .put(reviewsController.reviewsFullUpdateOne)
    .delete(reviewsController.reviewsDeleteOne)
    .post(reviewsController.reviewsAddOne);


module.exports = router;