const express = require('express');
const { getOrderById,addOrderItems, updateOrderToPaid } = require('../controllers/orderController');

const protect = require('../middleware/auth');

const router = express.Router()

router.route('/').post(protect,addOrderItems)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').post(protect,updateOrderToPaid)

module.exports = router