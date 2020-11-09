const express = require('express')
const products = require('./data/products')
const dotenv = require('dotenv');
const connectDB = require('../backend/config/db');
const productRoute = require('./routes/productRoute');
const {errorHandler,notFound} = require('./middleware/errors');
const userRoute = require('../backend/routes/userRoute');

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/products',productRoute)
app.use('/api/users',userRoute)

app.use(notFound)
app.use(errorHandler)


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

