const express = require("express");
const mongoose = require("mongoose");

const Student = mongoose.model("Student");
module.exports.getAll = function (req, res) {

    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        if (parseInt(req.query.count) <= 7) {
            count = parseInt(req.query.count);
        }
    }

    Student.find().limit(count).skip(offset).exec(function (err, student) {
        console.log("Student game=" + student);
        res.status(200).json(student);
    });
    // Student.find().exec(function (err, res) {
    //  res.status(200).json(res);
    // });

}

module.exports.getWithCount = function (req, res) {

    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        if (parseInt(req.query.count) <= 7) {
            count = parseInt(req.query.count);
        }
    }

    Student.find().limit(count).skip(offset).exec(function (err, student) {
        console.log("Student game=" + student);
        res.status(200).json(student);
    });
}

module.exports.getOne = function (req, res) {
    const studentId = req.params.studentId;
    console.log("gameId=" + studentId)
  
    Student.findById(studentId).exec(function(err, student) {
        res.status(200).json(student);
        });

}

 
 