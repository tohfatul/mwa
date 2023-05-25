const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const travel = mongoose.model(process.env.TRAVEL_MODEL);
//const photo = mongoose.model(process.env.PHOTO_MODEL);

const getAll = function(req, res){
    console.log("photo controller getAll");
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_COUNT;

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(isNaN(offset) && isNaN(count)){
        res.status(400).json({"message": "Query string offset and count should be numbers"});
    }
    const travelId = req.params.travelId;
    travel.findById(travelId).select("photos").skip(offset).limit(count).exec(function(err, travel){
        if(err){
            console.log("Error finding travels", err);
            res.status(500).json(err);
        }else{
            console.log("found photos", travel.photos, "for travel ", travel);
            res.status(200).json(travel.photos);
        }
    });
}
const getOne = function(req, res){
    console.log("photo controller get one");
    
    const travelId = req.params.travelId;
    const photoId = req.params.photoId;
    travel.findById(travelId).select("photos").exec(function(err, travel){
        if(err){
            console.log("Error finding photo", err);
            res.status(500).json(err);
        }else{
            console.log(travel.photos.id(photoId));
            res.status(200).json(travel.photos.id(photoId));
        }
    });
}
const addOne = function(req, res){
    console.log("AddOne photo Req Received");
    const travelId = req.params.travelId;

    const newPhoto = {
        "title": req.body.title,
        "url": req.body.url
    }
    
    travel.findById(travelId).exec(function(err, travel){
        if(!err){
            _addNewPhoto(req, res, newPhoto, travel);
            //res.status(response.status).json(response.message);
            
        }
    });
    
}

const _addNewPhoto = function(req, res, newPhoto, selectedTravel){
    selectedTravel.photos.push(newPhoto);
    selectedTravel.save(travel, function(err, updatedTravel){
        const response = {"status": 201, message: updatedTravel};
        if(err){
            console.log("error creating photo");
            response.status=500;
            response.message=err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    addOne:addOne
}