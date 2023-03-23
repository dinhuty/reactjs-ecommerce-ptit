import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import data from '../../data/db.json'
import { add } from '../Redux/cartSlice.js'
const ProductDetail = () => {
  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.cart)
  const { id } = useParams()
  const thisProduct = data.products.find(product => product.id == id)

  const handleClickAddItem = () => {

    dispatch(add(thisProduct))
  }

  return (
    <div className='productdetail container'>
      <div className="title">
        {thisProduct.title}
      </div>
      <img src={thisProduct.image} />
      <button onClick={handleClickAddItem} className="button"><h1>Add to cart</h1></button>
    </div>
  )
}

export default ProductDetail
