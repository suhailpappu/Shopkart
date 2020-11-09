import { 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
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