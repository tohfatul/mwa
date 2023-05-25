const bcrypt = require("bcrypt");
const { promisify } = require('util');
const compare = promisify(bcrypt.compare);
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const userModel = mongoose.model(process.env.USER_MODEL);

const tokenSecret = "This is something secret";

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
    fullname: req.body.fullname,
    email: req.body.email,
    password: hashVal
    };

    return new Promise((resolve, reject)=>{
        userModel.create(newUser).then(createdUser=>{
            resolve(createdUser)
        }).catch(err=>{
            reject(err)
        });
    });
    
}

const _setResponse = function(status, message){
    response.status = status,
    response.message = message
}

const _sendResponse = function(res){
    res.status(parseInt(response.status, 10)).json(response.message);
}

const addOne = function(req, res){
    const saltRound = 10;

    console.log(req.body);
    bcrypt.genSalt(saltRound)
    .then(salt=> _generateHash (req.body.password, salt))
    .then(hashVal => _createUser(req, hashVal))
    .then(createdUser => _setResponse(process.env.API_CREATED, createdUser))
    .catch(err => _setResponse (process.env.API_SERVER_ERROR, err))
    .finally (() => _sendResponse(res));
}

const _ifUserExists = function(req){
    return new Promise((resolve, reject)=>{
        userModel.findOne({"email": req.body.email})
        .then(foundUser=>{
            resolve(foundUser);
        })
        .catch(err=>{
            reject(err);
        })
    });
    
}
const _isPasswordMatched = function(req, user){
    return new Promise((resolve, reject)=>{
        compare(req.body.password, user.password).then((isTrue)=>{
            if(isTrue){
                const token = jwt.sign({ "email": user.email }, tokenSecret, { expiresIn: '1h' });
                resolve({"fullname": user.fullname, "token": token});
            }else{
                reject("Invalid credentials");
            }
        })
        .catch(err=>{
            reject(err);
            console.log(err);
        })
    })
}

const login = function(req, res){
    
    
    _ifUserExists(req)
    .then(foundUser=> _isPasswordMatched(req, foundUser))
    .then(matchResponse=> _setResponse(process.env.API_OK, matchResponse))
    .catch(err=> _setResponse(process.env.API_UNAUTHORISED_ERROR, err))
    .finally(()=>_sendResponse(res));
}
module.exports={
    addOne: addOne,
    login: login
}