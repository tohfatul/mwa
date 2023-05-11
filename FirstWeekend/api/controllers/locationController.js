const mongoose = require("mongoose");
const travel = mongoose.model(process.env.TRAVEL_MODEL);

const getOne = function(req, res){
    console.log("get one location controller");
    const travelId = req.params.travelId;
    travel.findById(travelId).select("location").exec(function(err, travel){
        if(err){
            console.log ("error finding location");
            res.status(500).json(err);
        }else{
            console.log("found location", travel.location, "for travel ", travel);
            res.status(200).json(travel.location);
        }
        
    })
}

module.exports = {
    getOne: getOne
}