
const mongoose = require("mongoose");
const Site = mongoose.model("Site");
const log = console.log;
const ObjectId = mongoose.Schema.ObjectId;
module.exports.reviewsGetAll = function (req, res) {
    log("reviewsGetAll");
    console.log("reviewsGetAll Get All");
    const siteId = req.params.siteId;
    console.log("site Id=" + siteId);
    Site.findById(siteId)
        .select('reviews')
        .exec(function (err, site) {
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
            if (!site) {
                console.log("404: Error finding site");
                response.status = 404;
                response.message = { message: "Game not found" };
            } else {
                console.log("game==" + site);
                response.message = site.reviews;
            }
            res.status(response.status).json(site);
        });
}

//reviewsGetOne
module.exports.reviewsGetOne = function (req, res) {
    log("reviewsGetOne");
    
    const siteId = req.params.siteId;
    const reviewId=req.params.reviewId;
    console.log("site Id=" + siteId);
    Site.findById(siteId)
        .select('reviews')
        .exec(function (err, site) {
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
            if (!site) {
                console.log("404: Error finding site");
                response.status = 404;
                response.message = { message: "Game not found" };
            } else {
                console.log("game==" + site);
                response.message = site.reviews;
            }
            res.status(response.status).json(site);
        });
}
const _addreviews = function (req, res, site) {
    console.log("Adding review");
    console.log("From Body ", req.body);
    const newreview = {
        name: req.body.name,
        review: req.body.review,
        rate: req.body.rate
    }
    Site.findOneAndUpdate(
        { _id: site._id }, {
        $push: { reviews: newreview },
        new: true,
        upsert: true,
        rawResult: true,
        useFindAndModify: true
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

}
const _deleteReviews = function (req, res, site) {
    console.log("Delete review");
    console.log("From Body ", req.body);
    const newreview = {
        name: req.body.name,
        review: req.body.review,
        rate: req.body.rate
    }
    Site.findOneAndUpdate(
        { _id: site._id }, {
        $push: { reviews: newreview },
        new: true,
        upsert: true,
        rawResult: true,
        useFindAndModify: true
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

}


module.exports.reviewsAddOne = function (req, res) {
    log("reviewsAddOne")
    const siteId = req.params.siteId;
    Site.findById(siteId)
        .exec(function (err, site) {
            const response = { status: 200, message: [] };
            if (err) {
                console.log("Error", err);
                response.status = 500;
                response.message = err;
            } else if (!site) {
                console.log("site id not found in database", siteId);
                response.status = 404;
                response.message = { "message": "Site ID not found" + siteId };
            }
            if (site) {
                _addreviews(req, res, site);

            } else {
                res.status(response.status).json(response.message);
            }

        });

}
// module.exports.reviewsFullUpdateOne = function (req, res) {
//     log("reviewsFullUpdateOne")
// }
// module.exports.reviewsPartialUpdateOne = function (req, res) {
//     log("reviewsPartialUpdateOne")
// }

module.exports.reviewsDeleteOne = function (req, res) {

    log("reviewsDeleteOne");
    const siteId=req.params.siteId;
    const reviewId=req.params.reviewId;
    Site.findOneAndUpdate(
        { _id: siteId }, {
        $pull: { reviews: {
            '_id':mongoose.Types.ObjectId.createFromHexString(reviewId),
           // name: 'Gondor Palace',
        } },
        remove: true,
        rawResult: true,
        useFindAndModify: true
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

 
}