import { 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL
} from '../constants/constants'

import axios from 'axios'

export const fetchProducts = () => async(dispatch) => {
    try {
        dispatch({
            type:PRODUCT_LIST_REQUEST
        })

        const { data } = await axios.get('/api/products')

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    } catch (e) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const fetchSingleProduct = (id) => async(dispatch) => {
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    } catch (e) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const deleteProductByAdmin = (id) => async(dispatch,getState) =>{
    try {

        
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
 
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        await axios.delete(`/api/products/${id}`,config)
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
            
        })
 
        
    } catch (e) {
     dispatch({
         type:PRODUCT_DELETE_FAIL,
         payload:e.response && e.response.data.message ? e.response.data.message : e.message
     })
    }
 }

 export const createProductByAdmin = () => async(dispatch,getState) =>{
    try {

        
        dispatch({
            type:PRODUCT_CREATE_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
 
        const config = {
            headers:{
                
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        const {data} = await axios.post(`/api/products`,{},config)
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data
        })
 
        
    } catch (e) {
     dispatch({
         type:PRODUCT_CREATE_FAIL,
         payload:e.response && e.response.data.message ? e.response.data.message : e.message
     })
    }
 }

 export const updateProductByAdmin = (product) => async(dispatch,getState) =>{
    try {

        
        dispatch({
            type:PRODUCT_UPDATE_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
 
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        const {data} = await axios.put(`/api/products/${product._id}`,product,config)
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data
        })
        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data 
        })
        
    } catch (e) {
     dispatch({
         type:PRODUCT_UPDATE_FAIL,
         payload:e.response && e.response.data.message ? e.response.data.message : e.message
     })
    }
 }