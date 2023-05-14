
const mongoose = require("mongoose");
const travel = mongoose.model(process.env.TRAVEL_MODEL);
const getAll = function(req, res){
    console.log("Get all games");
    res.status(200).json({"message": "All Games"});
}
const addOne = function(req, res){
    console.log("add one post req received");

    const newTravel = {
        "location": req.body.location,
        "country": req.body.country,
        "photos": req.body.photos
    }
    travel.create(newTravel, function(req, travel){
        res.status(201).json(travel);
    });
    //res.status(201).json(req.body);
}
module.exports={
    getAll: getAll,
    addOne: addOne
}