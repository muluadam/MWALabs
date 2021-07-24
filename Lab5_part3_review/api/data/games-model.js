const mongoose = require("mongoose");

const reviewSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    review:{
        type:String,
        required: true
    },
    date:{
        type:String
    }
});

const publisherSchema=new mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    location:{
       coordinates:{
           type:[Number],
           index:"2dshere"
       }
    }
});
 



const gameSchema= new mongoose.Schema({
    title:{
        type:String,
        requred:true
    },
    year: {
        type:Number,
        
        default:1
     },
    rate:Number,
    price:Number,
    minPlayers: {
        type:Number,
        min:1,
        max:10
    },
    maxPlayers:Number,
    minAge:Number,
    designers:[String],
    publisher:publisherSchema,
    review:reviewSchema
});


mongoose.model("Game",gameSchema,"games");