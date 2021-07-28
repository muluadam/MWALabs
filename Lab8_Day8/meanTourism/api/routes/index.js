const express = require("express");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const siteController = require("../controller/site.controller");
const visitorController = require("../controller/visitor.controller");

const reviewController = require("../controller/reviews.controller");
const tourController = require("../controller/tour.controller"); 
const router = express.Router();


router.route("/sites")
    .get(siteController.sitesGetAll)
    .post(siteController.sitesAddOne);


router.route("/sites/:siteId")
    .get(siteController.sitesGetOne)
    .put(siteController.sitesFullUpdateOne)
    .patch(siteController.sitesPartialUpdateOne)
    .delete(siteController.sitesDeleteOne);

 

router.route("/visitors/")
    .get(visitorController.visitorsGetAll)
    .post(visitorController.visitorsAddOne);

router.route("/visitors/:visitorId")
    .get(visitorController.visitorsGetOne)
    .put(visitorController.visitorsFullUpdateOne)
    .patch(visitorController.visitorsPartialUpdateOne)
    .delete(visitorController.visitorsDeleteOne);


    router.route("/sites/:siteId/reviews")
    .get(reviewController.reviewsGetAll)
    .post(reviewController.reviewsAddOne);

router.route("/sites/:siteId/reviews/:reviewId")
    .get(reviewController.reviewsGetOne)
    .delete(reviewController.reviewsDeleteOne);


router.route("/sites/:siteId/visitors")
    .get(tourController.tourGetAllVisitorsBySite)

router.route("/sites/:siteId/visitors/:visitorId")
    .post(tourController.tourAddOneVisitorToSite)
    .delete(tourController.tourDeleteOneVisitorFromSite)
 

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));


module.exports = router;