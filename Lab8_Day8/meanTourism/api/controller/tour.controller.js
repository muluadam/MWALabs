
const mongoose = require("mongoose");
const Site = mongoose.model("Site");
const Visitor = mongoose.model("Visitor");
var ObjectId = mongoose.Schema.ObjectId;
const log = console.log;
module.exports.tourGetAllVisitorsBySite = function (req, res) {
    log("visitorsGetAll");
    const siteId = req.params.siteId;
    console.log("site Id=" + siteId);
    Site.findById(siteId)
        .populate('visitors')

        .select('visitors')
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




const _addSiteVisitor = function (req, res, site) {
    console.log("Adding visitor");
    console.log("From Body ", req.body);

    const visitorId = req.params.visitorId;
    // log("visitorId=",req.params.visitorId); 
    // const _vid = mongoose.Types.ObjectId.createFromHexString(visitorId); 
    // log("visitorId_vid=",_vid); 
    //     const vid=new ObjectId(visitorId);
    //     const newVistor={       

    //        // visitors:mongoose.Types.ObjectId.createFromHexString(req.params.visitorId)
    // visitors:vid
    //     } 

    Site.findOneAndUpdate({ _id: site._id }, {
        $push: { visitors: visitorId },
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

module.exports.tourAddOneVisitorToSite = function (req, res) {
    log("reviewsAddOne")
    const siteId = req.params.siteId;
    Site.findById(siteId)
         .populate('visitors')
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
                _addSiteVisitor(req, res, site);

            } else {
                res.status(response.status).json(response.message);
            }

        });

}


//TODO:  Will be update on github
module.exports.tourDeleteOneVisitorFromSite = function (req, res) {
  
    log("tourDeleteOneVisitorFromSite");
    const siteId=req.params.siteId;
    const visitorId=req.params.visitorId;
    log(visitorId)
    log(siteId)
    Site.findOneAndUpdate(
        { _id: siteId }, {
        $pull: { visitors: {
            '_id':mongoose.Types.ObjectId.createFromHexString(visitorId),
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