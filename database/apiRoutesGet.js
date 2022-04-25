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
    const params= req.params.cat
    console.log('getting product')
    console.log(params)
    try{
        const q= await Product.find({}).where('category').equals(params)
        console.log(q)
        res.json(q)
    }
    catch(err){
        throw err
    }
})





module.exports = router