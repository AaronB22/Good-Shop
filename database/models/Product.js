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
        type:String
    },
    img:{
         data: Buffer,
        contentType: String
        
    },
    price:{
        type:Number
    }
})

const Product= mongoose.model('Product', productSchema);
module.exports= Product