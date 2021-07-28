const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1

    },
    date: {
        type: Date,
        default: Date.now

    }
});


const siteSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    name_am: {
        type: String,
        requred: true
    },
    category: {
        type: String,
        requred: true
    },

    desc: {
        type: String,
    },
    desc_am: {
        type: String,
    },
    country: {
        type: String
    },
    address: {
        name: {
            type: String
        },
        location: {
            coordinates: {
                type: [Number],
                index: "2dshere"
            }
        },
        default: {}
    },
    reviews: [reviewSchema],
    visitors:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor'
       

    }]
});


mongoose.model("Site", siteSchema, "sites");

