import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import ProductDetail from './components/ProductDetail/ProductDetail';
import { ToastContainer } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-toastify/dist/ReactToastify.css';
import Introduce from './components/Introduce/Introduce';
import { Provider } from 'react-redux';
import store from './components/Redux/store';
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/admin/Login';
import Admin from './components/admin/Admin';
import Order from './components/Cart/Order';
import Checkout from './components/Cart/Checkout';
import UserDB from './components/admin/UserDB'
import OrderDB from './components/admin/OrderDB'
import ProductDB from './components/admin/ProductDB'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SkeletonTheme baseColor='#ededed' highlightColor='#faf7f7'>
        <ToastContainer limit={1}></ToastContainer>
        <BrowserRouter >
          <Routes>
            <Route path='/' element={<App />}>
              <Route path="" element={<Home />} />
              <Route path="signIn" element={<SignIn />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="products" element={<Products />} />
              <Route path="introduce" element={<Introduce />} />
              <Route path="contact" element={<Products />} />
              <Route path="cart" element={<Cart />} />
              <Route path="cart/order" element={<Order />} />
              <Route path="cart/checkout" element={<Checkout />} />
              <Route path="products/:id" element={<ProductDetail />} />

            </Route>
            <Route path='/admin' element={<Admin />}>
              <Route path="" element={<ProductDB />} />
              <Route path="login" element={<Login />} />
              <Route path="userManagement" element={<UserDB />} />
              <Route path="orderManagement" element={<OrderDB />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
