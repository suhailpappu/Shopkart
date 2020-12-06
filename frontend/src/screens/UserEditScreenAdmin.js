import React, { useState } from 'react'
import { useEffect } from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails, login, register, updateUserByAdmin } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { USER_UPDATE_RESET } from '../constants/constants'

const UserEditScreenAdmin = ({match,history}) => {

    const userId = match.params.id

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    
    const [isAdmin,setIsAdmin] = useState(false)
    

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const {loading,error,user} = userDetails

    const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)

    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdateAdmin

    useEffect(() => {
        
        if (successUpdate) {
            dispatch({
                type:USER_UPDATE_RESET
            })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id!==userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

        
    },[user,dispatch,userId,getUserDetails,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserByAdmin({
            _id:userId,
            name,
            email,
            isAdmin
        }))

    }

    return (
        <>
        
            <Link to='/admin/userList' className='btn btn-light my-3'>
                Go Back
            </Link>
        
        <FormContainer>
           <h1>Edit User</h1>
        {
            loadingUpdate && <Loader/>
        }
        {
            errorUpdate && <Message variant='danger'>{errorUpdate}</Message>
        }

           {
              loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                         <Form.Label> <strong>Name</strong> </Form.Label>
                         <Form.Control type='username' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
     
                    <Form.Group controlId='email'>
                         <Form.Label> <strong>Email Address</strong> </Form.Label>
                         <Form.Control type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
     
                    <Form.Group controlId='isadmin'>
                         
                         <Form.Check 
                         type='checkbox' 
                         label='Is Admin' 
                         
                         checked ={isAdmin} 
                         onChange={(e) => setIsAdmin(e.target.checked)}
                         >

                         </Form.Check>
                    </Form.Group>
     
                    <Button type='submit'variant='primary'>
                        Update
                    </Button>
                </Form>
              )
           }
        </FormContainer>
        </>
    )
}

export default UserEditScreenAdmin
