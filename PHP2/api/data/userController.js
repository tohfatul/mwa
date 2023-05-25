const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = mongoose.model(process.env.USER_MODEL);

const response = {
    status: 200,
    message: ""
}

const _generateHash = function(password, saltVal){
    return new Promise((resolve, reject)=> {
        resolve(bcrypt.hash(password, saltVal))
    });
}
    
const _createUser = function(req, hashVal) {
    const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: hashVal
    };

    return new Promise((resolve, reject)=>{
        userModel.create(newUser).then(createdUser=>{
            resolve(createdUser)
        }).catch(err=>{
            reject(err)
        });
    })
    
}


const _setResponse = function(status, message){
    response.status = status,
    response.message = message
}

const _sendResponse = function(res){
    res.status(response.status).json(response.message);
}

const addOne = function(req, res){
    const saltRound = 10;

    bcrypt.genSalt(saltRound)
    .then(salt=> _generateHash (req.body.password, salt))
    .then(hashVal => _createUser(req, hashVal))
    .then(createdUser => _setResponse(process.env.CREATED_STATUS_SUCCESS, createdUser))
    .catch(err => _setResponse (process.env.SERVER_STATUS_ERROR, err))
    .finally (() => _sendResponse(res));
}

module.exports={
    addOne: addOne
}