import React from 'react'
import { TopNav } from './components/TopNav/TopNav';
import { BrowserRouter, Routes, Route, Router, Outlet } from 'react-router-dom';
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
import Introduce from './components/Introduce/Introduce';

function App() {
  return (
    <>
      <TopNav />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
