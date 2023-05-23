const bcrypt = require("bcrypt");
const { reject } = require("bcrypt/promises");
const { response } = require("express");
const mongoose = require("mongoose");
const userModel = mongoose.model(process.env.USER_MODEL);


const _generateHash = function(password, saltVal){
    return new Promise((resolve, reject)=> {
        resolve(bcrypt.hash(password, saltVal))
    });
}
    
const _createUser = function(req, hashVal) {
    const newUser = {
    username: req.body.username,
    email: req.body.email,
    email: req.body.email,
    password: hashVal
    };
}


const addOne = function(req, res){
    const saltRound = 10;

    bcrypt.genSalt(saltRound)
    .then(salt=> _generateHash (req.body.password, salt))
    .then(hashVal => _createUser(req, hashVal))
    .then(createdUser => _setResponse(response, process.env.CREATED_STATUS_SUCCESS, createdUser))
    .catch(err => _setResponse (response, process.env.SERVER_STATUS_ERROR, err))
    .finally (() => _sendResponse(res, response));
}