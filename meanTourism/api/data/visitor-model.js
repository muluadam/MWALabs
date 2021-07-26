 
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
 


const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    email: {
        type: String,
        requred: true,
       
    },
    country: {
        type: String,
    }
});
 
mongoose.model("Visitor", visitorSchema, "visitors");

