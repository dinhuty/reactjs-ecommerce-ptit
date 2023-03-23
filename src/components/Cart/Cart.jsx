import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {remove} from '../Redux/cartSlice'
import './cart.css'
const Cart = () => {
  const cartList = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  console.log(cartList)
  const handleClickRemove = (id) =>{
    dispatch(remove(id))
  }
  return (
    <div className='cart container'>
      {cartList.map((product, index) => (
        <div key={index}>
          <div className="h1">{product.title}</div>
          <button onClick={() => handleClickRemove(product.id)}>Xoa</button>

        </div>
      ))}
    </div>
  )
}

export default Cart
