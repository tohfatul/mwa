const mongoose = require("mongoose");
const locationSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    coordinates: [Number]
});

const photoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
});

const travelSchema = mongoose.Schema({
    location : locationSchema,
    country: {
        type: String,
        required: true
    },
    photos: [photoSchema]
});

mongoose.model("Travel", travelSchema, "travels");