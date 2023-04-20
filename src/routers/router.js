import Cart from "../components/Cart/Cart";
import Order from "../components/Cart/Order";
import Checkout from "../components/Cart/Checkout";
import { Home } from "../components/Home/Home";
import Introduce from "../components/Introduce/Introduce";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Products from "../components/Products/Products";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";

export const publicRouter = [
    {
        path: '', component: Home
    },
    {
        path: '/signIn', component: SignIn
    },
    {
        path: '/signUp', component: SignUp
    },
    {
        path: '/products', component: Products
    },
    {
        path: '/products/:id', component: ProductDetail
    },
    {
        path: '/introduce', component: Introduce
    },
    {
        path: '/cart', component: Cart
    },
    {
        path: '/contact', component: Cart
    },
    {
        path: '/cart/order', component: Order
    },
    {
        path: '/cart/checkout', component: Checkout
    },

]