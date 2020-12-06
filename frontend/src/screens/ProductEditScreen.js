import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSingleProduct, updateProductByAdmin } from '../actions/productActions'
import { getUserDetails, login, register, updateUserByAdmin } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { PRODUCT_UPDATE_RESET, USER_UPDATE_RESET } from '../constants/constants'
import S3FileUpload from 'react-s3';
import  firebase  from "../firebase/firebase";


const ProductEditScreen = ({match,history}) => {

    const productId = match.params.id

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState('')
    const [description,setDescription] = useState('')
    const [uploading,setUploading] = useState(false)
    
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const {loading,error,product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)

    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({
                type:PRODUCT_UPDATE_RESET
            })
            history.push('/admin/productslist')
        } else {
            if (!product.name || product._id!==productId) {
                dispatch(fetchSingleProduct(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setCategory(product.category)
            }
        }
        
    },[product,dispatch,productId,history,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProductByAdmin({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

    const config = {
        bucketName: 'shopkartimages',
 /* optional */
        region: 'us-east-1',
        accessKeyId: 'ASIAQIX2AY3GUYWAPZCJ',
        secretAccessKey: '0ocyzFMkAxtNxFwU3Nufz5EVVXh1VWFrY2npw9nJ',
    }

    const uploadToS3 = async(e) => {
        try {
            const file = e.target.files[0]
        setUploading(true)
        const {data} = await S3FileUpload.uploadFile(file,config)
        
        console.log(data)
        setImage(data.url)
        setUploading(false)
        } catch (e) {
            console.error('from edit screen',e)
            setUploading(false)
        }

        
    }

    const uploadToFirebase = async(e) => {
        try {
            const folderName = 'images'
            const file = e.target.files[0]
            const storageRef = firebase.storage().ref(`${folderName}/${file.name+Date.now()}`)
            const uploadTask = storageRef.put(file)
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,snap =>{},err => {console.log(error)},()=>{
                storageRef.getDownloadURL().then(url=>{
                    console.log(url);
                    setImage(url)
                    setUploading(false)
                })
                
            })
        setUploading(true)
        //const {data} = await S3FileUpload.uploadFile(file,config)
        // firebase.storage().ref().child('images/'+file.name).getDownloadURL().then(url => {
        //     console.log('link is ',url)
        // setImage(url)
        // setUploading(false)
        //})
        
        } catch (e) {
            console.error('from edit screen',e)
            setUploading(false)
        }
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
        try {
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload',formData,config)
            console.log('data is ',data);
            setImage(data)
            setUploading(false)
        } catch (e) {
            console.error('from edit screen',e)
            setUploading(false)
        }
    }

    return (
        <>
        
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
        
        <FormContainer>
           <h1>Edit Product</h1>
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
     
                    <Form.Group controlId='price'>
                         <Form.Label> <strong>Price</strong> </Form.Label>
                         <Form.Control type='number' placeholder='Enter your price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
     
                    <Form.Group controlId='image'>
                    <Form.Label> <strong>Image</strong> </Form.Label>
                         <Form.Control 
                         type='text' 
                         
                         placeholder='Enter Image URL'
                         value ={image} 
                         onChange={(e) => setImage(e.target.value)}
                         >

                         </Form.Control>
                         <Form.File 
                         id='image-file'
                         label='Choose an image for the product'
                         custom
                         onChange={uploadToFirebase}
                         
                         >

                         </Form.File>
                         {
                             uploading && <Loader/>
                         }
                    </Form.Group>

                    <Form.Group controlId='brand'>
                    <Form.Label> <strong>Brand</strong> </Form.Label>
                         <Form.Control 
                         type='text' 
                         
                         placeholder='Enter brand'
                         value ={brand} 
                         onChange={(e) => setBrand(e.target.value)}
                         >

                         </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                         <Form.Label> <strong>Count In Stock</strong> </Form.Label>
                         <Form.Control type='number' placeholder='Enter stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                    <Form.Label> <strong>Category</strong> </Form.Label>
                         <Form.Control 
                         type='text' 
                         
                         placeholder='Enter Category'
                         value ={category} 
                         onChange={(e) => setCategory(e.target.value)}
                         >

                         </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                    <Form.Label> <strong>Description</strong> </Form.Label>
                         <Form.Control 
                         type='text' 
                         
                         placeholder='Enter description'
                         value ={description} 
                         onChange={(e) => setDescription(e.target.value)}
                         >

                         </Form.Control>
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

export default ProductEditScreen
