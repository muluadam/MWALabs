const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({

        name: {
            type: String,
            required: true
        },
        location: {
            coordinates: {
                type: [Number],
                index: "2dshere"
            }
        },
      //  _id:mongoose.ObjectId
    

   
});




const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        requred: true
    },
    year: {
        type: Number,

        default: 1
    },

    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: Number,
    minAge: Number,
    designers: [String],
    publisher: {
        name: {
            type: String,
            required: true
        },
        location: {
            coordinates: {
                type: [Number],
                index: "2dshere"
            }
        },
        default: {}
    },
    reviews: [String]
});


mongoose.model("Game", gameSchema, "games");
mongoose.model("Publisher",publisherSchema);