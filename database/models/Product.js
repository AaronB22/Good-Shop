const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema= new Schema({
    name:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    category:{
        
    },
    price:{
        type:Number
    }
})

const Product= mongoose.model('Product', productSchema);
module.exports= Product