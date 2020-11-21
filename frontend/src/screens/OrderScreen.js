import React from 'react'
import { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { Message } from '../components/Message'
import {Loader} from '../components/Loader'
import axios from 'axios'
import { useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/constants'


const OrderScreen = ({match}) => {

    const dispatch = useDispatch()

    const [sdkReady,setSdkReady] = useState(false)

    const orderId = match.params.id

    const orderDetails = useSelector(state => state.orderDetails)
    const { order,loading,error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPayPal,success:successPayPal } = orderPay

    if (!loading) {
        
        order.itemsPrice = order.orderItems.reduce((acc,item) => acc+item.price * item.qty,0)
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    console.log('paymentMethod',order);
    useEffect(() => {
        // if (order.paymentMethod==='Paypal') {
            
            const addPayPalScript = async () => {
                const {data :clientId} = await axios.get('/api/config/paypal')
                console.log(clientId);
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }
        

            if(!order || successPayPal){
                dispatch({
                    type:ORDER_PAY_RESET
                })
                dispatch(getOrderDetails(orderId))
            }else if(!order.isPaid){
                if(!window.paypal ){
                    addPayPalScript()
                }else{
                    setSdkReady(true)
                }
            }
        //}
        // else{
        //     dispatch(getOrderDetails(orderId))
        // }

    },[dispatch,orderId,successPayPal,order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId,paymentResult))
    }

    const addRazorPayScript = async () => {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if(!res){
            alert("Payment gateway failed to load are you online?")
            return
        }

            const amount = order.totalPrice
            const phone_number = '+919234567890'
            const email = order.user.email
            const orderIdd = orderId

            let params = {
                amount:amount,
                currency:'INR',
                receipt:orderIdd,
              
            }

            const url = '/api/config/razorpay'
            const reqest = {
                url:url,
                params:params,
                method:'GET'
            }

            console.log(reqest);
            const response = await axios(reqest)
            const processParams = await response.data
            console.log('paramss',processParams)

            
        
        // const data = await axios.get('/api/config/razorpay')
        // console.log(data);

        const options = {
            "key": "rzp_test_wHNtWvry6hDx3M", 
            amount:processParams.amount, 
            currency: processParams.currency,
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": processParams.orderId, 
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
                dispatch(payOrder(orderId))
            console.log('sucessssssss');
            },
            "prefill": {
                "name": order.user.name,
                "email": order.user.email,
                "contact": "9999999999"
            },
            
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open()
        

    }


    const isDate = (val)=> {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
      }
      
      const isObj=(val)=> {
        return typeof val === 'object'
      }
      
      const stringifyValue=(val)=> {
        if (isObj(val) && !isDate(val)) {
          return JSON.stringify(val)
        } else {
          return val
        }
      }
      
      const buildForm=({ action, target, params })=> {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
        form.setAttribute('target', target)
      
        Object.keys(params).forEach(key => {
          const input = document.createElement('input')
          input.setAttribute('type', 'hidden')
          input.setAttribute('name', key)
          input.setAttribute('value', stringifyValue(params[key]))
          form.appendChild(input)
        })
      
        return form
      }
      
      const post=(details)=> {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
      }



    const paytmPaymentHandler = async(e) => {
        e.preventDefault()
        try {
            
            const amount = order.totalPrice
            const phone_number = '+919234567890'
            const email = order.user.email
            const orderIdd = orderId

            let params = {
                orderId:orderIdd,

                txnAmount:amount,
                    
                userInfo:{
                    custId:orderIdd,
                    email:email,
                    phone_number:phone_number

                }
            }

            const url = '/api/config/paytm'
            const reqest = {
                url:url,
                params:params,
                method:'GET'
            }

            console.log(reqest);
            const response = await axios(reqest)
            const processParams = await response.data
            console.log('paramss',processParams)

            var details = {
                action:'https://securegw-stage.paytm.in/order/process',
                params:processParams
            }
            post(details)

        } catch (error) {
            console.log(error);
        }
    }

    const paypalPayment = (method) => {
        if(method === 'Paypal'){
            return !order.isPaid && (
                <ListGroup.Item>
                    {
                        loadingPayPal && <Loader/>
                    }
                    {
                        !sdkReady ? <Loader/> : (
                            <PayPalButton 
                                amount={order.totalPrice}
                                // onSuccess={successPaymentHandler}
                            />
                        )
                    }
                </ListGroup.Item>
            )                            
        }else{
            return !order.isPaid && (
                <ListGroup.Item>
                    
                    {
                        addRazorPayScript
                    }
                </ListGroup.Item>
            )
        }
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
:
<>
<Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <strong>Name : </strong>{order.user.name} <br/>
                            <strong>Email: </strong>
                             <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            <p>

                                <strong>Address :</strong>
                                {' '}
                                {
                                    order.shippingAddress.address
                                },
                                {
                                    order.shippingAddress.city
                                },
                                {
                                    order.shippingAddress.postalCode
                                },
                                {' '}
                                {
                                    order.shippingAddress.country
                                }
                                {' '}
                            </p>

                            {
                                order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                                <Message variant='danger'>Not Delivered</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                            <strong>Method: </strong>
                            {
                                order.paymentMethod
                            }
                            </p>
                            {
                                order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                                <Message variant='danger'>Not paid</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {
                                order.orderItems.length === 0 ? (
                                    <Message>Order is Empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {
                                            order.orderItems.map((item,index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>

                                                        <Col>
                                                            <Link to={`/product/${item.product}`} >
                                                                {
                                                                    item.name
                                                                }
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            { item.qty } x ${ item.price } = ${item.qty * item.price}
                                                        </Col>
                                                    </Row>

                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {
                                    order.paymentMethod === 'Paypal' ? (
                                        !order.isPaid && (
                                            <ListGroup.Item>
                                                {
                                                    loadingPayPal && <Loader/>
                                                }
                                                {
                                                    !sdkReady ? <Loader/> : (
                                                        <PayPalButton 
                                                            amount={order.totalPrice}
                                                            onSuccess={successPaymentHandler}
                                                        />
                                                    )
                                                }
                                            </ListGroup.Item>
                                        )
                                    ) : 
                                        (
                                        !order.isPaid && (
                                            <ListGroup.Item>
                                                <Button onClick={addRazorPayScript}>Pay with Razorpay</Button>
                                            </ListGroup.Item>
                                        )
                                    )
                                    
                                }
                            </ListGroup>
                        </Card>
                </Col>
            </Row> 

</>
}

export default OrderScreen
