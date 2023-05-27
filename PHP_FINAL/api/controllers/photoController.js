const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const travel = mongoose.model(process.env.TRAVEL_MODEL);

const getAll = function(req, res){
    console.log(process.env.API_PHOTO_GET_ALL_MESSAGE);
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_COUNT;

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(isNaN(offset) && isNaN(count)){
        res.status(process.env.API_BADREQUEST_ERROR).json({"message": process.env.API_OFFSET_COUNT_INVALID_NUMBER});
    }
    const travelId = req.params.travelId;
    travel.findById(travelId).select("photos").skip(offset).limit(count).exec(function(err, travel){
        if(err){
            console.log( err);
            res.status(process.env.API_SERVER_ERROR).json(err);
        }else{
            
            res.status(process.env.API_OK).json(travel.photos);
        }
    });
}
const getOne = function(req, res){
    console.log(process.env.API_PHOTO_GET_ONE_MESSAGE);
    
    const travelId = req.params.travelId;
    const photoId = req.params.photoId;
    travel.findById(travelId).select("photos").exec(function(err, travel){
        if(err){
            res.status(500).json(err);
        }else{
            console.log(travel.photos.id(photoId));
            res.status(200).json(travel.photos.id(photoId));
        }
    });
}
const addOne = function(req, res){
    console.log(process.env.API_PHOTO_ADD_ONE_MESSAGE);
    const travelId = req.params.travelId;

    const newPhoto = {
        "title": req.body.title,
        "url": req.body.url
    }
    
    travel.findById(travelId).exec(function(err, travel){
        if(!err){
            _addNewPhoto(req, res, newPhoto, travel);
        }
    });
    
}

const _addNewPhoto = function(req, res, newPhoto, selectedTravel){
    selectedTravel.photos.push(newPhoto);
    selectedTravel.save(travel, function(err, updatedTravel){
        const response = {"status": 201, message: updatedTravel};
        if(err){
            response.status=process.env.API_SERVER_ERROR;
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