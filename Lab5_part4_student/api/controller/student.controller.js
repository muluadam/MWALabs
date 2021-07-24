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
        console.log("Student =" + student);
        res.status(200).json(student);
    });
    // Student.find().exec(function (err, res) {
    //  res.status(200).json(res);
    // });

}

module.exports.studentGetAll = function (req, res) {

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
        console.log("Student  =" + student);
        res.status(200).json(student);
    });
}

module.exports.studentGetOne = function (req, res) {
    const studentId = req.params.studentId;
    console.log("studentId=" + studentId)
  
    Student.findById(studentId).exec(function(err, student) {
        res.status(200).json(student);
        });

}



//TODO: ------------------------------------------------------------------------------------------------------------- 
 

 
module.exports.studentAddOne = function (req, res) {
    console.log("Student AdeOne");

    console.log("title=" + req.body.name);
    Student.create({
        name: req.body.name,
        gpa: parseInt(req.body.gpa),
      
    },
        function (err, student) {
            if (err) {
                console.log("Errir Creating" + err);
                res.status(400).json(err)
            } else {
                console.log(" created", student)
                res.status(201).json(student);
            }
        });

}

//-----------------------------------------------------------------------------------------------------------

module.exports.studentsFullUpdateOne = function (req, res) {
    console.log("studentIdFullUpdate");
    const studentId = req.params.studentId;
    Student.findById(studentId).select("-reviews -publisher").exec(function (err, student) {
        const response = { status: 204 };
        if (err) {
            response.status = 500;
            response.message = err
        }
        if (!student) {
            response.status = 204;
            response.message = { "message": "student  not Found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message)
        } else {
            student.name = req.body.name;
          
            student.gpa = parseFloat(req.body.gpa);
       
            student.save(function (err, updatedStudent) {
                if (err) {


                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message)
            });
        }

    });

};
module.exports.studentsPartialUpdateOne = function (req, res) {
    console.log("Student FullUpdate-PUT");
    const studentId = req.params.studentId;
    Student.findById(studentId).select("-course").exec(function (err, student) {
        const response = { status: 204 };
        if (err) {
            response.status = 500;
            response.message = err
        }
        if (!student) {
            response.status = 204;
            response.message = { "message": "Student  not Found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message)
        } else {
            if(req.body.name)
            student.name = req.body.name;
            if(req.body.gpa)
            student.gpa = parseFloat(req.body.gpa);
         
            student.save(function (err, updatedStudent) {
                if (err) {

                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message)
            });
        }

    });

};

 
module.exports.studentDeleteOne = function (req, res) {
    const studentId = req.params.studentId;
    Student.findByIdAndDelete(studentId).exec(function (err, deletedStudent) {
        const response = { status: 204 };
        if (err) {
            console.log("Error  Finding ");
            response.status = 500;
            response.message = err;
        }
        if (!deletedStudent) {
            response.status = 404;
            response.message = { message: "Student  Id not Found" };
        }
        res.status(response.status).json(response.message);
    });
};