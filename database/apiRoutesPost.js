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
    try{
        const newUser= body;
        newUser.password= await bcrypt.hash(body.password, 10)
        console.log(newUser.password)
       User.insertMany(newUser)
            .then(x=>{
                res.json(x)
            })
       
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.post('/api/validateUser', async({body}, res)=>{
    try{
        const user= await User.find({}).where('email').equals(body.email)
        console.log(user.length)
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


module.exports = router