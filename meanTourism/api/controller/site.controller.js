const express = require('express');
const mongoose = require("mongoose");
const Site = mongoose.model("Site");
const log = console.log;


/**
 * @Status --Completed
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.sitesGetAll = function (req, res) {
    let offset = 0;
    let count = 5;
    const maxCount = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        if (parseInt(req.query.count) <= 7) {
            count = parseInt(req.query.count);
        }
    }
    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({ message: "QureyString offset and cournt Problem" });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({ message: "Requesting more than your limit" });
        return;
    }
    log("sitesGetAll");
    Site.find()

        .limit(count)
        .skip(offset)
        .populate('visitors')
        .exec(function (err, result) {
            if (err) {
                console.log("Error Site=" + err);

                res.status(400).json(err);
            }
            if (result) {
                console.log("Foound Site=" + result);
                res.status(200).json(result);
            }
        });

}
module.exports.sitesAddOne = function (req, res) {
    Site.create({
        name: req.body.name,
        name_am: req.body.name_am,
        category: req.body.category,
        desc: req.body.desc,
        desc_am: req.body.desc_am,
        country: req.body.country,


        address: {},
        reviews: []
    },
        function (err, game) {
            if (err) {
                console.log("Errir Creating Games" + err);
                res.status(400).json(err)
            } else {
                console.log("Game created", game)
                res.status(201).json(game);
            }
        });

    log("sitesGetOne");
}
module.exports.sitesGetOne = function (req, res) {
    const siteId = req.params.siteId;
    log(siteId);
    Site
    .findById(siteId)
    .populate('visitors')
    .exec(function (err, site) {
        res.status(200).json(site)
    });

    log("sitesGetOne");
}

module.exports.sitesPartialUpdateOne = function (req, res) {
    log("sitesPartialUpdateOne");

    const siteId = req.params.siteId;
    log(siteId);
    Site.findOneAndUpdate(siteId)
        .select("-reviews -visitors -address")
        .exec(function (err,site){
            log("Excuting site")
            const response={status:204}
            if(err){
                log("Error Saving site",err)
                response.status=500;
                response.message=err;
            }
            if(!site){
                log("Error Saving , Site not found site")
                response.status=400;
                response.message={message:" Site with the Id not found"}
            }
            log(site)
            log(response.status)
            if(response.status!=204){
                log("Error Saving ,checking response status")
                res.status(response.status).json(response.message);
            }else{

                if(req.body.name )site.name=req.body.name;
                if(req.body.name_am )site.name_am=req.body.name_am;
                if(req.body.category )site.category=req.body.category;
                if(req.body.desc )site.desc=req.body.desc;
                if(req.body.desc_am )site.desc_am=req.body.desc_am;
                if(req.body.country )site.country=req.body.country;
                log(site);
                site.save(function(err, updatedSite){
                    log("Saving site")
                    if(err){
                        response.status=500;
                        response.message=err;
                    }else{
                       response.message=updatedSite;
                    }
                    res.status(response.status).json(response.message);
                });

            }

        })
}

module.exports.sitesFullUpdateOne = function (req, res) {


    log("sitesFullUpdateOne");

    const siteId = req.params.siteId;
    log(siteId);
    Site.findOneAndUpdate(siteId)
        .select("-reviews -visitors -address")
        .exec(function (err,site){
            log("Excuting site")
            const response={status:204}
            if(err){
                log("Error Saving site",err)
                response.status=500;
                response.message=err;
            }
            if(!site){
                log("Error Saving , Site not found site")
                response.status=400;
                response.message={message:" Site with the Id not found"}
            }
            log(site)
            log(response.status)
            if(response.status!=204){
                log("Error Saving ,checking response status")
                res.status(response.status).json(response.message);
            }else{

                site.name=req.body.name;
                site.name_am=req.body.name_am;
                site.category=req.body.category;
                site.desc=req.body.desc;
                site.desc_am=req.body.desc_am;
                site.country=req.body.country;
                log(site);
                site.save(function(err, updatedSite){
                    log("Saving site")
                    if(err){
                        response.status=500;
                        response.message=err;
                    }else{
                       response.message=updatedSite;
                    }
                    res.status(response.status).json(response.message);
                });

            }

        })
}

module.exports.sitesDeleteOne = function (req, res) {

    const siteId = req.body.siteId;
    log("sitesDeleteOne");
    Site.findOneAndDelete(siteId)
        .exec(function (err, deletedSite) {
            const response = { status: 204, message: { message: "Site Deleted" } };
            if (err) {
                console.log("Error  Finding Site");
                response.status = 500;
                response.message = err;
            }
            if (!deletedSite) {
                response.status = 404;
                response.message = { message: "Site  Id not Found" };
            }
            res.status(response.status).json(response.message);
        })
}


