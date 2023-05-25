const mongoose = require ("mongoose");
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required : true
    }
});
mongoose.model(process.env.USER_MODEL, userSchema, process.env.USER_COLLECTION);