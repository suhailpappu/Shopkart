import { ORDERS_DELIVER_FAIL, ORDERS_DELIVER_REQUEST, ORDERS_DELIVER_SUCCESS, ORDERS_LIST_FAIL, ORDERS_LIST_REQUEST, ORDERS_LIST_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/constants"
import axios from 'axios'

export const createOrder = (order) => async(dispatch,getState) =>{
    try {

        
        dispatch({
            type:ORDER_CREATE_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
 
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        const {data} = await axios.post(`/api/orders`,order,config)
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
 
        
    } catch (e) {
     dispatch({
         type:ORDER_CREATE_FAIL,
         payload:e.response && e.response.data.message ? e.response.data.message : e.message
     })
    }
 }

 export const getOrderDetails = (id) => async(dispatch,getState) =>{
    try {

        
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
 
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        const { data } = await axios.get(`/api/orders/${id}`,config)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })
 
        
    } catch (e) {
     dispatch({
         type:ORDER_DETAILS_FAIL,
         payload:e.response && e.response.data.message ? e.response.data.message : e.message
     })
    }
 }


 export const payOrder = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:ORDER_PAY_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
 
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        console.log(userInfo.token);
        let d = {}
        const { data } = await axios.post(`/api/orders/${id}/pay`,{},config)
        console.log('data is ',data)
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })
 
        
    } catch (e) {
     dispatch({
         type:ORDER_PAY_FAIL,
         payload:e.response && e.response.data.message ? e.response.data.message : e.message
     })
    }
 }


 export const deliverOrder = (order) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:ORDERS_DELIVER_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
 
        const config = {
            headers:{
                
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        //console.log(userInfo.token);
        let d = {}
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`,{},config)
        //console.log('data is ',data)
        dispatch({
            type:ORDERS_DELIVER_SUCCESS,
            payload:data
        })
 
        
    } catch (e) {
     dispatch({
         type:ORDERS_DELIVER_FAIL,
         payload:e.response && e.response.data.message ? e.response.data.message : e.message
     })
    }
 }

 export const listOrders = () => async(dispatch,getState) =>{
    try {

        const {userLogin:{userInfo}} = getState()

        dispatch({
            type:ORDERS_LIST_REQUEST
        })
 
        const config = {
            headers:{
                
                Authorization:`Bearer ${userInfo.token}`
            }
        }
 
        const {data} = await axios.get(`/api/orders`,config)
        dispatch({
            type:ORDERS_LIST_SUCCESS,
            payload:data
        })
 
        
    } catch (e) {
     dispatch({
         type:ORDERS_LIST_FAIL,
         payload:e.response && e.response.data.message ? e.response.data.message : e.message
     })
    }
 }

