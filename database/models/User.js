const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema= new Schema({
    email:{
        type: String,
        unique: true
    },
    name:{
        type:String,
        trim:true
    },
    password:{
        type:String
    },
    googleToken:{
        type:String
    },
    cart:{
        type:[String]
    }
})

const User= mongoose.model('User', userSchema);
module.exports= User