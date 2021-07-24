const mongoose = require("mongoose");

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
        min:1,
        max:5,
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
    publisher:publisherSchema
});


mongoose.model("Game",gameSchema,"games");