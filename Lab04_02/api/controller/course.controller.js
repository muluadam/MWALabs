const express = require("express");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
module.exports.courseGetAll = function (req, rs) {

    const studentId=req.params.studentId;
    Student.findById(studentId).exec(function(err, student){
        const  courses=student.course;
        res.status(200).json(courses);
    });

}
 
module.exports.courseGetOne= function (req, rs) {

    const studentId=req.params.studentId;
    const courseId=req.params.courseId;
    Student.findById(studentId).exec(function(err, student){
        const  courses=student.course.findById(courseId).exec(function(err,course){
            res.status(200).json(course);
        });
 
    });

}

 