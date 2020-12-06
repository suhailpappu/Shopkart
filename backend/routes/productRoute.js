const express = require('express');
const { getProducts, getSingleProduct,deleteProductByAdmin, updateProductByAdmin, createProductByAdmin } = require('../controllers/productController');
const router = express.Router()
const {protect,admin} = require('../middleware/auth')

//desc = Fetch all products
//route = GET /api/products
//access = Public (anyone can see the products)
router.route('/').get(getProducts).post(protect,admin,createProductByAdmin)


//desc = Fetch single products
//route = GET /api/products/:id
//access = Public (anyone can see the product)
router.route('/:id').get(getSingleProduct).delete(protect,admin,deleteProductByAdmin).put(protect,admin,updateProductByAdmin)

module.exports = router