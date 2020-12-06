import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { createProductByAdmin, deleteProductByAdmin } from '../actions/productActions'
import { fetchProducts } from '../actions/productActions'
import { deleteUserByAdmin, listUsers } from '../actions/userActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { PRODUCT_CREATE_RESET } from '../constants/constants'

const ProductListScreen = ({history,match}) => {
    const dispatch = useDispatch()

    const productList = useSelector(state=>state.productList)

    const {loading,error,products} = productList

    const productDelete = useSelector(state=>state.productDelete)

    const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete

    const productCreate = useSelector(state=>state.productCreate)

    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct} = productCreate

    const userLogin = useSelector(state=>state.userLogin)

    const {userInfo} = userLogin



    useEffect(()=>{
        dispatch({
            type:PRODUCT_CREATE_RESET
        })

        if(!userInfo.isAdmin){
            
           history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(fetchProducts())
        }

    },[dispatch,history,userInfo,successDelete,successCreate])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure ?'))
            dispatch(deleteProductByAdmin(id))
    }

    const createProductHandler = () => {
        dispatch(createProductByAdmin())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1 style={{paddingLeft:'15px'}}>Products</h1>
                </Col>
                <Col className='text-right' style={{paddingRight:'25px'}}>
                    <Button className='my-3'  onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {
                loadingDelete &&<Loader/>
            }
            {
                errorDelete && <Message variant='danger'>{errorDelete}</Message>
            }
            

            {
                loadingCreate &&<Loader/>
            }
            {
                errorCreate && <Message variant='danger'>{errorCreate}</Message>
            }
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                :
                (
                    <Table striped bordered hover responsive className='table-sm' style={{paddingLeft:'145px'}}>
                        <thead >
                            <tr style={{textAlign:'center'}}>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            {product.brand}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
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
        </>
    )
}

export default ProductListScreen
