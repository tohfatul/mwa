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

mongoose.model(process.env.TRAVEL_MODEL, travelSchema, process.env.TRAVEL_COLLECTION);
//mongoose.model(process.env.PHOTO_MODEL, photoSchema, "photos");