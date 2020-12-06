import { createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {productCreateReducer, productDeleteReducer, productReducer, productUpdateReducer} from '../reducers/productReducer'
import { productDetailsReducer } from '../reducers/productDetailsReducer';
import {cartReducer} from '../reducers/cartReducer'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from '../reducers/userReducer';
import { orderDeliverReducer, orderDetailsReducer, orderPayReducer, orderReducer, ordersListReducer } from '../reducers/orderReducer';


const reducer = combineReducers({
    productList: productReducer,
    productDetails: productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdateAdmin:userUpdateReducer,
    orderCreate:orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    ordersList:ordersListReducer,
    orderDeliver:orderDeliverReducer
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


