const getAll = function(req, res){
    console.log("JSON GET Req Received");
    res.status(200).send({"Key": "travels"});
}
const getOne = function(req, res){
    console.log("JSON GET Req Received");
    res.status(200).send({"Key": "travels"});
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
