
const mongoose = require("mongoose");
const travel = mongoose.model(process.env.TRAVEL_MODEL);
const getAll = function(req, res){
    console.log("Get all travels");
    let offset = 0;
    let count=10;

    travel.find().skip(offset).limit(count).exec(function(err, travels){
        res.status(200).json(travels);
    });
}

const getOne = function(req, res){
    travel.findById(req.params.travelId).exec(function(err, travel){
        res.status(200).json(travel);
    });
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
}
const deleteOne = function(req, res){
    travel.findByIdAndDelete(req.params.travelId).exec(function(err, deletedTravel){
        res.status(202).json(deletedTravel);
    });
}
module.exports={
    getAll: getAll,
    getOne:getOne,
    addOne: addOne,
    deleteOne: deleteOne
}