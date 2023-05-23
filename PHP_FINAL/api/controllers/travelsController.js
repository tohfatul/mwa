
const mongoose = require("mongoose");
const travel = mongoose.model(process.env.TRAVEL_MODEL);

const response = {
    status: parseInt(process.env.API_OK, 10),
    message: ""
};

const getAll = function(req, res){
    console.log("JSON GET Req Received");
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_COUNT;
    
    
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

    travel.find().skip(offset).limit(count).exec()
    .then(travels=> response.message=travels)
    .catch(err=>{
        response.status = parseInt(process.env.API_SERVER_ERROR, 10);
        response.message = err;
    })
    .finally(()=> res.status(response.status).json(response.message));
}

const getOne = function(req, res){
    console.log("JSON GET_ONE Req Received");
    const travelId = req.params.travelId;

    travel.findById(travelId).exec()
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
    console.log("AddOne Travel Req Received");
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

const _updateOne = function(req, res, updateTravelCallBack){
    console.log("update one travel controller");
    const travelId = req.params.travelId;
    // travel.findById(travelId).exec(function(err, travel){
       
    //     if(err){
    //         console.log("error finding travel");
    //         response.status=500;
    //         response.message=err;
    //     } else if(!travel){
    //         console.log("travel id not found");
    //         response.status=404;
    //         response.message={"message": "Travel Id not found"};
    //     }
    //     if(response.status != 204){
    //         res.status(response.status).json(response.message);
    //     }else{
    //         updateTravelCallBack(req, res, travel, response)
    //     }
    // });

   
    travel.findById(travelId).exec()
    // .then(travel=>{
    //     if(!travel){
    //         response.status= parseInt(process.env.API_NOT_FOUND_ERROR);
    //         response.message = API_NOT_FOUND_MESSAGE
    //     }
    //     else{
    //         updateTravelCallBack
    //     }
    // })
    .then(travel=>_updateData(travel))
    .then(data=> {
        response.status = 200;
        response.message = data;
    })
    .catch(err=> {
        response.status= 500;
        response.message=("Server Error", err);
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    });


}

const _updateData = function(data){
    return new Promise((resolve, reject)=>{
        // if (!data){
        //     console.log("error finding");
        //     reject("err happened");
        // }else{
        //     console.log("executed resolve");
        //     resolve(data);
        // }

        reject("error happened");
    })
}

const fullUpdateOne = function(req, res){
    console.log("JSON fullUpdate Req Received");
    // const travelUpdate = function(req, res, travel, response){
    //     travel.location=req.body.location;
    //     travel.country = req.body.country;
    //     travel.photos = req.body.photos;
    //     travel.save(function(err, updatedTravel){
    //         if(err){
    //             response.status = 500;
    //             response.message = err;
    //         }
    //         response.status = 200;
    //         response.message = updatedTravel;
    //         res.status(response.status).json(response.message);
    //     });
    // }
    // _updateOne(req, res, travelUpdate);

    const travelId = req.params.travelId;
    travel.findById(travelId).exec()
    .then(travel=>_updateData(travel))
    .then(data=> {
        response.status = 200;
        response.message = data;
    })
    .catch(err=> {
        response.status= 500;
        response.message=("Server Error", err);
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    });
}

const partialUpdateOne = function(req, res){
    console.log("JSON partial update Req Received");
    
    const travelUpdate = function (req, res, travel, response){
        if(req.body.location.name){ travel.location.name = req.body.location.name };
        if(req.body.location.coordinates){ travel.location.coordinates = req.body.location.coordinates };
        if(req.body.country){travel.country = req.body.country};
        if(req.body.photos){travel.photos = req.body.photos};

        travel.save(function(err, updatedTravel){
            if(err){
                response.status = 500;
                response.message = err;
            }
            response.status = 200;
            response.message = updatedTravel;
            res.status(response.status).json(response.message);
        });
    }

    _updateOne(req, res, travelUpdate);

}
const deleteOne = function(req, res){
    console.log("JSON delete Req Received");
    const travelId = req.params.travelId;
    travel.findByIdAndDelete(travelId).exec(function(err, deletedTravel){
       
        if(err){
            console.log("error finding game");
            response.status = 500;
            response.message = err;
        }else if(!deletedTravel){
            console.log("travel id not found");
            response.status = 404;
            response.message = "travel id not found"
        };
        res.status(response.status).json(response.message);
    });
}
module.exports={
    getAll: getAll,
    getOne:getOne,
    addOne:addOne,
    fullUpdateOne: fullUpdateOne,
    partialUpdateOne: partialUpdateOne,
    deleteOne: deleteOne
}
