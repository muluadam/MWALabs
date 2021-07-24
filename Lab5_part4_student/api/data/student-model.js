const mongoose = require("mongoose");

const courseSchema=new mongoose.Schema({

    name:{
        type:String,
        required: true
    } ,
    code:{
        type:String,
        required: true
    } ,
});



const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        requred:true
    },
    gpa: {
        type:Number,
        min:0,
        max:4.0,
        default:1
     },
  
    course:[courseSchema]
});


mongoose.model("Student",studentSchema,"students");