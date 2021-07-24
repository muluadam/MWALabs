const express = require("express");

const studentController=require("../controller/student.controller");
const courseController=require("../controller/course.controller");
 
const router= express.Router();

//router.route("/getStudentsWithCount").get(studentController.getWithCount)

router.route("/students")
.get(studentController.getAll)
.post(studentController.studentAddOne);

router.route("/students/:studentId")
.get(studentController.studentGetOne)
.put(studentController.studentsFullUpdateOne)
.patch(studentController.studentsPartialUpdateOne)
.delete(studentController.studentDeleteOne) ;
 
router.route("/students/:studentId/courses").get(courseController.courseGetAll) 

router.route("/students/:studentId/courses/:courseId").get(courseController.courseGetOne) 

module.exports = router;

 