import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Row ,Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {

    const [products,setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get('/api/products')

            setProducts(res.data)
        }
        getProducts()
    },[])


    return (
        <div>
            <h1>Trending Products !</h1>

            <Row>
                {
                    products.map( (prod) => (
                        <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={prod} />
                        </Col>
                    ))
                }
            </Row>

            
        </div>
    )
}

export default HomeScreen
