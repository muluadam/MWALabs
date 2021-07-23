const express = require("express");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
module.exports.courseGetAll = function (req, rs) {

    const gameId=req.params.studentId;
    Student.findById(studentId).exec(function(err, student){
        const  courses=student.course;
        res.status(200).json(courses);
    });

}
 

 