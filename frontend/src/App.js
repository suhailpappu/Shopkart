import React from 'react';
import  Footer  from './components/Footer';
import  Header  from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const App = () => {
  return (

    <BrowserRouter>
        <Header/>
          <main className='py-3'>
                <h3>Hello this is Shopkart</h3>
                <Route path='/' component={HomeScreen} exact/>
                <Route path='/product/:id' component={ProductScreen} />
                <Route path='/cart/:id?' component={CartScreen} />
                <Route path='/login' component={LoginScreen} />
                <Route path='/register' component={RegisterScreen} />
                <Route path='/profile' component={ProfileScreen} />
                <Route path='/shipping' component={ShippingScreen} />
                <Route path='/payment' component={PaymentScreen } />
                <Route path='/placeorder' component={PlaceOrderScreen } />
                <Route path='/order/:id' component={OrderScreen } />
          </main>
        <Footer/>
        
    </BrowserRouter>
    
  );
}

export default App;
