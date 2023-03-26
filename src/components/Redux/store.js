import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice'
import productReducer from './productSlice'
const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        productData: productReducer
    },
});

export default store;