const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Razorpay = require('razorpay')



//desc = Create a new order
//route = POST /api/orders
//access = Private (anyone can see the products)
const addOrderItems = asyncHandler(async (req,res) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice 
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Order Items')
        return
    }else{
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//desc = Get order by ID
//route = GET /api/orders/:id
//access = Private 
const getOrderById = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate('user','name email')


    if (order) {
        res.json(order)
        
    }else{
        
        res.status(404)
        throw new Error('Order not found')
    }
})

//desc = Update order to paid
//route = GET /api/orders/:id/pay
//access = Private 
const updateOrderToPaid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)

    console.log(order);
    try {
        if (order) {
            console.log(req.params.id);
            order.isPaid = true
            order.paidAt = Date.now()
            // order.paymentResult = {
            //     id: req.body.id,
            //     status: req.body.status,
            //     update_time: req.body.update_time,
            //     email_address: req.body.payer.email_address
            // }
            console.log(order);
        
        const updatedOrder = await order.save()
        res.json(updatedOrder)
        }else {
            
            res.status(404)
            throw new Error('Order not found')
        }
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = {addOrderItems,getOrderById,updateOrderToPaid}