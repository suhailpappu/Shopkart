const express = require('express');

const {protect,admin} = require('../middleware/auth');

const router = express.Router()
const { getOrderById,addOrderItems, updateOrderToPaid, getOrdersByAdmin, updateOrderToDelivered } = require('../controllers/orderController');

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrdersByAdmin)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').post(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)

module.exports = router