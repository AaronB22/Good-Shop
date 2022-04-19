const router =require('express').Router();
const User= require('./models/User');
const Product= require('./models/Product')
const bcrypt = require('bcrypt');

// router.get('/api/userlogin', async(req, res)=>{
//     try{
       

//     }catch(err){
       
//     }
// })


router.get('/api/getAllProdsByCat/:cat', async (req, res)=>{
    try{
        const q= await Product.find({}).where('category').equals('test')
        console.log(q)
        res.json(q)
    }
    catch(err){
        throw err
    }
})





module.exports = router