const express = require("express");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');


const meanGameController=require("../controller/games.controller");
const publisherController=require("../controller/publishers.controller");
 
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


// router.route("/games/:gameId/publisher/:publisherId") 
//     .get(publisherController.publisherGetOne)
//     .put(publisherController.publisherFullUpdateOne)
//     .patch(publisherController.publisherPartialUpdateOne)
//     .delete(publisherController.publisherDeleteOne);


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));


module.exports = router;