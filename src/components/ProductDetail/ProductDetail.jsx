import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import data from '../../data/db.json'
import { add } from '../Redux/cartSlice.js'
import './detailproduct.css'
import { Button, Card, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { selectSucccess, selectToken } from '../Redux/authSlice'


const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams()
  const isLogin = useSelector(selectSucccess)
  const [product, setProduct] = useState({})

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    axios.get('https://localhost:7164/api/Products/' + id)
      .then(res => {
        setProduct(res.data)
      }).catch(error => {
        console.log(error)
      })
  }, [])
  const handleClickAddItem = () => {
    if (!isLogin) {
      navigate('/signIn')
    }
    else {
      dispatch(add(product))
    }
  }
  return (
    <Container>
      <div className="detail__product">
        <p className='main__title'>Chi tiết sản phẩm</p>
        <Row xs={1} xl={2} md={2}>
          <Col xl={4}>
            <img className='detail__product-img' src={`data:image/png;base64,${product.im}`} />
          </Col>
          <Col xl={8}>
            <div className="detail__product-title">
              <span>{product.name}</span>
            </div><br />
            <p></p>
            <p className='detail__product-desc'>{product.description}</p>

            <p className='detail__product-price'>Giá: <p>{ product.price && product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p></p>
            <Button onClick={handleClickAddItem} className="button__detail__add_cart cursor-btn"><p><i className="fa-sharp fa-solid fa-cart-shopping"></i>Add to cart</p></Button>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default ProductDetail
