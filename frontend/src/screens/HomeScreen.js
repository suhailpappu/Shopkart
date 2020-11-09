import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Row ,Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'

const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading,error,products } = productList



    // const [products,setProducts] = useState([])

    useEffect(() => {
        // const getProducts = async () => {
        // const res = await axios.get('/api/products')

        //     setProducts(res.data)
        // }
        // getProducts()
        dispatch(fetchProducts())

    },[dispatch])


     
    return (
        <>
            <h1>Trending Products !</h1>
    {
    loading 
    ? 
    <Loader/>
    : 
    error 
    ? 
    <Message variant='danger'>{error}</Message>
    : 
        <Row>
        {
            products.map( (prod) => (
                <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={prod} />
                </Col>
            ))
        }
    </Row>
    }
            
        </>

            
    )
}

export default HomeScreen
