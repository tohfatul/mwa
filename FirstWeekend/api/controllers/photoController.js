const mongoose = require("mongoose");
const travel = mongoose.model(process.env.TRAVEL_MODEL);

const getAll = function(req, res){
    console.log("photo controller");
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
            console.log("Error finding games", err);
            res.status(500).json(err);
        }else{
            console.log("found photos", travel.photos, "for travel ", travel);
            res.status(200).json(travel.photos);
        }
        
    });
}
module.exports = {
    getAll: getAll
}