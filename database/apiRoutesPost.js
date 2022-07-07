const router =require('express').Router()
const Product= require('./models/Product')
const Category= require('./models/Category')
const User= require('./models/User')
const bcrypt = require('bcrypt');



router.post('/api/createNewProduct',  ({body},res)=>{
    Product.insertMany(body)
        .then(x=>{
            res.json(x)
        })
})

router.post('/api/createCategory',({body},res)=>{
    Category.insertMany(body)
        .then(x=>{
            res.json(x)
        })
})

router.post('/api/newUser',async({body},res)=>{
    console.log('new User')
    try{
        const user= await User.find({}).where('email').equals(body.email)
        if(user.length===0){
            const newUser= body;
            if(newUser.password){
                newUser.password= await bcrypt.hash(body.password, 10)
            }
            if(newUser.googleToken){
                newUser.googleToken= await bcrypt.hash(body.googleToken, 10)
            }
           User.insertMany(newUser)
                .then(user=>{
                    const returnUser={
                        "email":user[0].email,
                        "name":user[0].name,
                        "id":user[0]._id
                    }

                    res.status(200).json(returnUser)
                })

        }
        if(user.length!==0){
            res.status(400).json({message:"Email in use"})
        }
       
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.post('/api/validateUser', async({body}, res)=>{
    try{
        const user= await User.find({}).where('email').equals(body.email)
        if(user.length===0){
            const delay= Math.random()*100
            setTimeout(()=>{
                res.status(400).json({message:"Email or Password is incorrect"})

            }, delay)
        }
        if(user.length===1){
            const validatePassword= await bcrypt.compare(
                body.password,
                user[0].password
            )
            if(validatePassword){
                const returnUser={
                    "email":user[0].email,
                    "name":user[0].name,
                    "id":user[0]._id
                }
                res.status(200).json(returnUser)
            }
            if(!validatePassword){
                res.status(400).json({message:"Email or Password is incorrect"})
            }

        }

    }catch(err){
        res.status(401).json(err)
    }
})


router.post('/api/googlevalidate', async({body}, res)=>{
    try{
        const user= await User.find({}).where('email').equals(body.email)
        if(user.length===1){
            const validateToken= await bcrypt.compare(
                body.googleToken,
                user[0].googleToken
            )
            if(validateToken){
                const returnUser={
                    "email":user[0].email,
                    "name":user[0].name,
                    "id":user[0]._id
                }
                res.status(200).json(returnUser)
            }
            if(!validatePassword){
                res.status(400).json({message:"Google Token Error"})
            }
        }
        if(user.length===0){
            const newUser= body;
            newUser.googleToken= await bcrypt.hash(body.googleToken, 10)
           User.insertMany(newUser)
                .then(user=>{
                    const returnUser={
                        "email":user[0].email,
                        "name":user[0].name,
                        "id":user[0]._id
                    }

                    res.status(200).json(returnUser)
                })
        }
    }catch(err){
        res.status(401).json(err)
    }
})

router.post('/api/newProduct', async({body}, res)=>{
    try{
       const newProduct= await Product.insertMany(body)
         res.status(200).json(newProduct)

    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})


router.post('/api/addToCart', async({body},res)=>{
    const data= await User.find({}).where('_id').equals(body._id)
    const cart= data[0].cart;
    let duplicate=false
    for(let i=0;i<cart.length; i++){
        
        if(cart[i]===body.cart){
            duplicate=true
        }
    }

    if(!duplicate){
        cart.push(body.cart)
        const filter={
            'email':body.email
        }
    
        const update = await User.findOneAndUpdate(filter, {"cart":cart}, {upsert: true})
        res.json(update)

    }
    if(duplicate){
        res.status(400)
    }
    
})

router.post('/api/removeFromCart', async({body},res)=>{

    const req= await User.find({}).where("_id").equals(body.userId)
    const currentCart=req[0].cart;
    const newCart= [];
    for(let i=0; i<currentCart.length; i++){
        if(currentCart[i]!==body.cartId){
            newCart.push(currentCart[i])
        }

    }
    const filter={
        'email':body.email
    }
    const update = await User.findOneAndUpdate(filter, {"cart":newCart}, {upsert: true})
        res.json(update)
})

    router.post('/api/removeAllFromCart', async({body}, res)=>{
        const cart=[];
        const filter={
            'email':body.email
        };
        const update = await User.findOneAndUpdate(filter, {"cart":cart}, {upsert: true})
        res.json(update)

    })

module.exports = router