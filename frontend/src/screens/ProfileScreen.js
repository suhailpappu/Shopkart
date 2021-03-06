import React, { useState } from 'react'
import { useEffect } from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUserDetails, updateUserProfileDetails } from '../actions/userActions'

import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { userUpdateProfileReducer } from '../reducers/userReducer'

const ProfileScreen = ({location,history}) => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const {loading,error,user} = userDetails

    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    const userUpdate = useSelector(state => state.userUpdateProfile)

    const {success} = userUpdate

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }else{
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history,userInfo,dispatch,user])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfileDetails({id:user._id,name,email,password}))
        }

    }

    return (
        <Row>
            <Col md={3}>
            <h1>Edit Profile</h1>
           {
               message && <Message variant='danger'>{message}</Message>
           }

           {
               error && <Message variant='danger'>{error}</Message>
           }
           {
               success && <Message variant='success'>Profile Updated</Message>
           }
           {
               loading && <Loader/>
           }
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='username' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
               </Form.Group>

               <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
               </Form.Group>

               <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
               </Form.Group>

               <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
               </Form.Group>

               <Button type='submit'variant='primary'>
                    Update
               </Button>

               </Form>
            </Col>
            <Col md={9}>
<h2>My orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
