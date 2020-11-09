const express = require('express');
const { getProducts, getSingleProduct } = require('../controllers/productController');
const router = express.Router()

//desc = Fetch all products
//route = GET /api/products
//access = Public (anyone can see the products)
router.get('/',getProducts)


//desc = Fetch single products
//route = GET /api/products/:id
//access = Public (anyone can see the product)
router.get('/:id',getSingleProduct)

module.exports = router