import { createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {productReducer} from '../reducers/productReducer'
import { productDetailsReducer } from '../reducers/productDetailsReducer';
import {cartReducer} from '../reducers/cartReducer'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from '../reducers/userReducer';
import { orderDetailsReducer, orderPayReducer, orderReducer } from '../reducers/orderReducer';


const reducer = combineReducers({
    productList: productReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
     cart:{
         cartItems:cartItemsFromStorage,
         shippingAddress:shippingAddress
     },
     userLogin:{
         userInfo:userInfoFromStorage
     },
     
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store


