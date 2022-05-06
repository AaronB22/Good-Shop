const router =require('express').Router();
const User= require('./models/User');
const Product= require('./models/Product')
const bcrypt = require('bcrypt');



router.get('/api/getAllProdsByCat/:cat', async (req, res)=>{
    const params= req.params.cat
    try{
        const q= await Product.find({}).where('category').equals(params)
        res.json(q)
    }
    catch(err){
        throw err
    }
})

router.get('/api/productById/:id', async (req, res)=>{
    const params= req.params.id
    try{
        const q= await Product.find({}).where('_id').equals(params);
        res.json(q)
    }
    catch(err){
        throw err
    }
})

router.get("/search/:query", async (req, res)=>{
    const params= req.params.query;
    console.log(params)
    const q= await Product.find({})
    let returnArr=[]
    for(let i=0;i<q.length; i++){
        if(q[i].name.includes(params)){
            returnArr.push(q[i])
        }
    }
    res.json(returnArr)
    
})


router.get('/api/getUser/:id', async (req, res)=>{
    const params= req.params.id
    console.log('getting user')
    console.log(params)
    try{
        const q= await User.find({}).where('_id').equals(params);
        console.log(q)
        res.json(q)
    }
    catch(err){
        throw err
    }
})





module.exports = router