import React from "react";
import { useEffect,useState } from "react";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../actions/productActions";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";


const ProductScreen = ({ match,history }) => {

  const [quantity,setQuantity] = useState(1)

  // const [product,setProducts] = useState([])
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const { loading,error,product } = productDetails
    useEffect(() => {
        // const getProduct = async () => {
        //     const res = await axios.get(`/api/products/${match.params.id}`)

        //     setProducts(res.data)
        // }
        // getProduct()
        dispatch(fetchSingleProduct(match.params.id))
    },[])

    const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])


  return (
    <>
      Hello this is {product.name}
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
  {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
    <Row>
    <Col md={6}>
      <Image src={product.image} alt={product.name} />
    </Col>

    <Col md={3}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>{product.name}</h3>
        </ListGroup.Item>

        <ListGroup.Item>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          Price : {product.price}
        </ListGroup.Item>

        <ListGroup.Item>
          Description : {product.description}
        </ListGroup.Item>

      </ListGroup>
    </Col>

    <Col md={3}>
        <Card>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>
                            Price:
                        </Col>
                        <Col>
<strong>{product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>
                            Status:
                        </Col>
                        <Col>
{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Col>
                    </Row>
                </ListGroup.Item>

                  {
                    product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Qty
                          </Col>
                          <Col>
                            <Form.Control 
                              as='select'
                              value={quantity}
                              onChange={e => setQuantity(e.target.value)}
                            >
                              {
                                [...Array(product.countInStock).keys()].map(x => (
                                  <option
                                    key = {x + 1}
                                    value = {x + 1}

                                  >
                                      {x + 1}
                                  </option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  }

                <ListGroup.Item>
                    <Button 
                    className='btn-block' 
                    type='button' 
                    disabled={product.countInStock === 0}
                    onClick={()=>addToCartHandler()}
                    >
                        Add to Cart
                    </Button>
                </ListGroup.Item>

            </ListGroup>
        </Card>
    </Col>

  </Row>
  )}
      
    </>
  );
};

export default ProductScreen;
