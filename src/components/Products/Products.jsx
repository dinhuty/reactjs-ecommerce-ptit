import React from 'react'
import './products.css'
import '../Home/home.css'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../data/img_banner.jpg'
import data from '../../data/db.json'
const Products = () => {
  let navigate = useNavigate();
  const hanldeViewProduct = (productID) => {
    navigate('/products/' + productID)
  }
  return (
    <div className='products container'>
      <h1 className='home-title'>Tất cả sản phẩm</h1>
      <div className="gird-card">
        {
          data.products.map((product, index) => (
            <div className="card-products" key={product.id}>
              <div onClick={() => hanldeViewProduct(product.id)} className="product_card_img">
                <img src={product.image} className='card__img' />
              </div>
              <h2 onClick={() => hanldeViewProduct(product.id)} className='card__title'>{product.title}</h2>
              <div className="card__content">
                <span className='card__price'>{product.price}<i class="fa-solid fa-dong-sign"></i></span>
                <Link to={`/products/${product.id}`} className='card__link'>Xem chi tiết</Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products
