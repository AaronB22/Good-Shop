const router =require('express').Router()
const Product= require('./models/Product')
const Category= require('./models/Category')
// router.get('/', async(req, res)=>{
    
// })
// router.post('/post', ({body}, res)=>{
//     console.log(body)
// })
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

module.exports = router