const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

//desc = Fetch all products
//route = GET /api/products
//access = Public (anyone can see the products)
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({})
    
    res.json(products)
})


//desc = Fetch single products
//route = GET /api/products/:id
//access = Public (anyone can see the product)
const getSingleProduct = asyncHandler(async (req,res) => {
    const product =await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    }else{
        res.status(404).json({message:'Product not found'})
    }

    res.json(product)
})

module.exports = {getProducts,getSingleProduct}