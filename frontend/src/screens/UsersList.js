import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteUserByAdmin, listUsers } from '../actions/userActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'

const UsersList = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state=>state.userList)

    const {loading,error,users} = userList

    const userLogin = useSelector(state=>state.userLogin)

    const {userInfo} = userLogin

    const userDelete = useSelector(state=>state.userDelete)

    const {success} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            
            dispatch(listUsers())
        }else{
            history.push('/')
        }
    },[dispatch,history,success,userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure ?'))
            dispatch(deleteUserByAdmin(id))
    }

    return (
        <div>
            <h1>Users</h1>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                :
                (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.isAdmin ? (
                                                    <i className="fas fa-check" style={{color:'green'}}></i>
                                                ):(
                                                    <i className="fas fa-times" style={{color:'red'}}></i>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )
            }
        </div>
    )
}

export default UsersList
