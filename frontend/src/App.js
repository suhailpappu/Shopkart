import React from 'react';
import  Footer  from './components/Footer';
import  Header  from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (

    <BrowserRouter>
        <Header/>
          <main className='py-3'>
                <h3>Hello this is Shopkart</h3>
                <Route path='/' component={HomeScreen} exact/>
                <Route path='/product/:id' component={ProductScreen} />
          </main>
        <Footer/>
        
    </BrowserRouter>
    
  );
}

export default App;
