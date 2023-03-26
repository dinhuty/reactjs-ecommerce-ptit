import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import data from '../../data/db.json'
import { add } from '../Redux/cartSlice.js'
import './detailproduct.css'
import { Button, Card, Col, Row } from 'react-bootstrap'


const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const thisProduct = data.products.find(product => product.id == id)

  const handleClickAddItem = () => {

    dispatch(add(thisProduct))
  }

  return (
    <Container>
      <div className="detail__product">
        <p className='main__title'>Chi tiết sản phẩm</p>
        <Row xs={1} xl={2} md={2}>
          <Col>
            <img className='detail__product-img' src={thisProduct.image} />
          </Col>
          <Col>
            <div className="detail__product-title">
              <span>{thisProduct.title}</span>
            </div><br />
            <p></p>
            <p className='detail__product-desc'>{thisProduct.description}</p>
            <p className='detail__product-price'>Giá: <p>{thisProduct.price}</p><i className="fa-solid fa-dong-sign"></i></p>
            <Button onClick={handleClickAddItem} className="button__detail__add_cart cursor-btn"><p><i class="fa-sharp fa-solid fa-cart-shopping"></i>Add to cart</p></Button>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default ProductDetail
