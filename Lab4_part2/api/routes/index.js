const express = require("express");

const studentController=require("../controller/student.controller");
const courseController=require("../controller/course.controller");
 
const router= express.Router();

router.route("/getStudentsWithCount").get(studentController.getWithCount)

router.route("/students").get(studentController.getAll)

router.route("/students/:studentId").get(studentController.getOne) 
 
router.route("/students/:studentId/courses").get(courseController.courseGetAll) 

router.route("/students/:studentId/courses/:courseId").get(courseController.courseGetOne) 

module.exports = router;

 