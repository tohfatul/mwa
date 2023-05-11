const mongoose = require("mongoose");
const travel = mongoose.model(process.env.TRAVEL_MODEL);
const getAll = function(req, res){
    console.log("JSON GET Req Received");
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_COUNT;
    const response = {
        status:200,
        message:""
    };

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    
    if(isNaN(offset) && isNaN(count)){
        console.log("invalid numbers in query string");
        response.status = 400;
        response.message = "offset and count in query string should be number";
        res.status(response.status).json(response.message);
    }

    travel.find().skip(offset).limit(count).exec(function(err, travels){
        if(err){
            console.log("travels not found", err);
            response.status = 500;
            response.message = err;
        }else{
            console.log("travels found");
            response.status = 200;
            response.message = travels;
        }
        res.status(response.status).json(response.message);
    });
    
}

const getOne = function(req, res){
    console.log("JSON GET_ONE Req Received");
    const travelId = req.params.travelId;

    travel.findById(travelId).exec(function(err, travel){
        res.status(200).json(travel);
    });
}
const addOne = function(req, res){
    console.log("JSON Post Req Received");
    res.status(200).send({"Key": "travels"});
}
const fullUpdateOne = function(req, res){
    console.log("JSON fullUpdate Req Received");
    res.status(200).send({"Key": "travels"});
}
const partialUpdateOne = function(req, res){
    console.log("JSON partial Req Received");
    res.status(200).send({"Key": "travels"});
}
const deleteOne = function(req, res){
    console.log("JSON delete Req Received");
    res.status(200).send({"Key": "travels"});
}
module.exports={
    getAll: getAll,
    getOne:getOne,
    addOne:addOne,
    fullUpdateOne: fullUpdateOne,
    partialUpdateOne: partialUpdateOne,
    deleteOne: deleteOne
}
