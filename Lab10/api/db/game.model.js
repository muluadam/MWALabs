const mongoose = require("mongoose");

const publisherSchema=new mongoose.Schema({

    name: {type:String,required:true},
    country:{
type:Number,
required:true
    },
    established:{
        type:Date,
        requred:false
    },
    location:{
        coordinates:{
            type:[Number],
        index:"2dsphere"
    }
}
});


const reviewSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        defaule:Date.now
    }


})
const gameSchema=new mongoose.Schema({
    title:{
        type:String,
        min:3
    },
    year:{type: Number},
    rate:{
        type: Number,
        min:1,
        max:5,
        default:1

    },
    price: {
        type:Number
    },
    minPlayers:{
        type:Number,
        min:1
    },
    maxPlayers:{
        type:Number,
        min:2
    },
    publisher:publisherSchema,
    reviews:[reviewSchema],
    minAge:{
        type:Number,
        
    } ,
    designers:[String]

});

mongoose.model("Game",gameSchema,"games");