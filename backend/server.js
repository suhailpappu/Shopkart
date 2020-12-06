const express = require('express')
const products = require('./data/products')
const dotenv = require('dotenv');
const connectDB = require('../backend/config/db');
const productRoute = require('./routes/productRoute');
const {errorHandler,notFound} = require('./middleware/errors');
const userRoute = require('../backend/routes/userRoute');
const orderRoutes = require('../backend/routes/orderRoutes');
const uploadRoutes = require('../backend/routes/uploadRoutes');
const Order = require('./models/orderModel');
const Razorpay = require('razorpay');
const { updateOrderToPaid } = require('./controllers/orderController');
const PaytmChecksum = require('./Paytm_Node_Checksum-master/PaytmChecksum')
const https = require('https');
const path = require('path');
const cors = require('cors');


dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)


const razorpay = new Razorpay({
	key_id: 'rzp_test_wHNtWvry6hDx3M',
	key_secret: 'lvgZn6kag74rLaK0EPlaFkwu'
})

app.get('/api/config/:provider',async (req,res) => {

    const { provider } = req.params

    if(provider === 'razorpay'){
        const payment_capture = 1
        const amount = 499
        const currency = 'INR'

        const options = {
            amount: req.query.amount*100,
            currency,
            receipt: req.query.orderId,
            payment_capture
        }

        try {
            const response = await razorpay.orders.create(options)
            console.log(response)
            res.json({
                id: response.id,
                currency: response.currency,
                amount: response.amount
            })
        } catch (error) {
            console.log(error)
        }
    }else if(provider === 'paypal'){
        res.send(process.env.PAYPAL_CLIENT_ID)
    }else{
        console.log('Please check your link');
    }

    
})


app.get('/api/config/paytm',async (req,res) => {

    const { provider } = req.params

    var paytmParams = {}

    paytmParams = {
        "requestType"   : "Payment",
        "MID"           : "orUjxJ12027275953365",
        "WEBSITE"       : 'WEBSTAGING',
        "ORDER_ID"       : req.query.orderId,

        "TXN_AMOUNT"     : req.query.txnAmount,
        "userInfo"      : req.query.userInfo,
    }

    PaytmChecksum.generateSignature(JSON.stringify(paytmParams), "29ryJD5oWedijQpC").then(function(checksum){

        console.log('checksum',checksum);
        
        paytmParams.head = {
            "signature"    : checksum
        };

        const params={
            ...paytmParams,
            "CHECKSUMHASH":checksum
        }
        console.log(params);
        res.json(params)

       

       
    });
    

    
//    if(provider === 'paypal'){
    
//        res.send(process.env.PAYPAL_CLIENT_ID)
//        // do something related to paypal    
//    }else if(provider === 'paytm'){

    

})



app.get('/api/callback',(req,res)=>{

    var paytmParams = {}

    paytmParams = {
        "requestType"   : "Payment",
        "MID"           : "orUjxJ12027275953365",
        "WEBSITE"       : 'WEBSTAGING',
        "ORDER_ID"       : req.query.orderId,

        "TXN_AMOUNT"     : req.query.txnAmount,
        "userInfo"      : req.query.userInfo,
    }
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams), "29ryJD5oWedijQpC").then(function(checksum){
    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=orUjxJ12027275953365&orderId=${req.query.orderId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
            console.log('Response: ', response);
        });
    });

    post_req.write(post_data);
    post_req.end();
})
})


app.use(notFound)
app.use(errorHandler)

const dirname = path.resolve()
console.log('name is ',path.join(dirname,'/frontend/public/images'));
app.use('/frontend/public/images',express.static(path.join(dirname,'/frontend/public/images')))

const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send('api is running')
})

app.get('/api/products',(req,res)=>{
    res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find(prod => prod._id === req.params.id)

    res.json(product)
})

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

