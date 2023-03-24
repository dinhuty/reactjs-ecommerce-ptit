import React from 'react'
import { TopNav } from './components/TopNav/TopNav';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { Home } from './components/Home/Home';
import Footer from './components/Footer/Footer';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import ProductDetail from './components/ProductDetail/ProductDetail';
import { ToastContainer } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <SkeletonTheme>
        <ToastContainer></ToastContainer>
        {/* basename='/reactjs-ecommerce-ptit' */}
        <BrowserRouter>
          <TopNav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/products" element={<Products />} />
            <Route path="/introduce" element={<Products />} />
            <Route path="/contact" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetail />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </SkeletonTheme>
    </>
  );
}

export default App;
