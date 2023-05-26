
const { parse } = require("dotenv");
const mongoose = require("mongoose");
const travel = mongoose.model(process.env.TRAVEL_MODEL);

const response = {
    status: parseInt(process.env.API_OK, 10),
    message: ""
};

const getAll = function(req, res){
    console.log(process.env.API_GET_MESSAGE);

    let offset = parse(process.env.DEFAULT_FIND_OFFSET, 10) ;
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10) ;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    
    if(isNaN(offset) && isNaN(count)){
        console.log(process.env.API_INVALID_NUMBER_MESSAGE);
        response.status = process.env.API_BADREQUEST_ERROR;
        response.message = process.env.API_OFFSET_COUNT_INVALID_NUMBER;
        res.status(parseInt(response.status, 10)).json(response.message);
    }
    travel.find().skip(offset).limit(count)
    .then(travels=> response.message=travels)
    .catch(err=>{
        response.status = parseInt(process.env.API_SERVER_ERROR, 10);
        response.message = err;
    })
    .finally(()=> res.status( parseInt(response.status,10) ).json(response.message));
}

const getOne = function(req, res){
    console.log(process.env.API_GET_MESSAGE);
    const travelId = req.params.travelId;

    travel.findById(travelId)
    .then((travel)=>{
        if(!travel){
            response.status= parseInt(process.env.API_NOT_FOUND_ERROR, 10);
            response.message=process.env.API_NOT_FOUND_MESSAGE;
        }else{
            response.status = parseInt(process.env.API_OK);
            response.message = travel;
        }
    })
    .catch(err=>{
        response.status = process.env.API_SERVER_ERROR;
        response.message = (process.env.API_SERVER_ERROR_MESSAGE, err);
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    });

}
const addOne = function(req, res){
    console.log(process.env.API_ADDONE_MESSAGE);
    const newTravel = {
        "location": req.body.location,
        "country": req.body.country,
        "photos": req.body.photos
    }
    
    travel.create(newTravel).then(travel=>{
        response.status = parseInt(process.env.API_CREATED, 10);
        response.message = newTravel;
    })
    .catch(err=>{
        response.status = parseInt(process.env.API_SERVER_ERROR, 10);
        response.message = err;
    }).finally(()=>{
        res.status(response.status).json(response.message);
    });
}

const fullUpdateOne = function(req, res){
    console.log(process.env.API_FULL_UPDATE_MESSAGE);
    const travelId = req.params.travelId;

    const updatedTravel = {
        "location": req.body.location,
        "country": req.body.country,
        "photos": req.body.photos
    }
    travel.findByIdAndUpdate(travelId, updatedTravel, {new: true})
    .then(data=> {
        response.status = process.env.API_OK;
        response.message = data;
    })
    .catch(err=> {
        response.status= process.env.API_SERVER_ERROR;
        response.message=(err);
    })
    .finally(()=>{
        res.status( parseInt(response.status,10)).json(response.message);
    });
}

const partialUpdateOne = function(req, res){
    console.log(process.env.API_PARTIAL_UPDATE_MESSAGE);
    
    if(req.body.location.name){ travel.location.name = req.body.location.name };
    if(req.body.location.coordinates){ travel.location.coordinates = req.body.location.coordinates };
    if(req.body.country){travel.country = req.body.country};
    if(req.body.photos){travel.photos = req.body.photos};

    travel.save(function(err, updatedTravel){
        if(err){
            response.status = process.env.API_SERVER_ERROR;
            response.message = err;
        }
        response.status = process.env.API_OK;
        response.message = updatedTravel;
        res.status(response.status).json(response.message);
    });

}

const deleteOne = function(req, res){
    console.log("JSON delete Req Received");
    const travelId = req.params.travelId;
    travel.findByIdAndDelete(travelId)
    .then(()=>{
        response.status = process.env.API_OK
        response.message=true
    })
    .catch(err=>{
        response.status = process.env.API_SERVER_ERROR;
        response.message = err;
    })
    .finally(()=>{
        res.status( parseInt(response.status, 10) ).json(response.message);
    })
}
module.exports={
    getAll: getAll,
    getOne:getOne,
    addOne:addOne,
    fullUpdateOne: fullUpdateOne,
    partialUpdateOne: partialUpdateOne,
    deleteOne: deleteOne
}
