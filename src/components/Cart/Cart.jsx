import React, { useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { add, reduce, remove } from '../Redux/cartSlice'
import './cart.css'
const Cart = () => {
  const cartList = useSelector((state) => state.cart)
  const handleUpdateQuality = (product, qualityx, title, index) => {
    if (qualityx == 1 && title == 'reduce') {
      dispatch(remove(product.id))
    } else if (title == 'reduce') {
      dispatch(reduce(product))
    } else {
      dispatch(add(product))
    }
  }
  const dispatch = useDispatch();
  console.log(cartList)
  const handleClickRemove = (id) => {
    dispatch(remove(id))
  }
  return (
    <Container>
      <div className="cart">
        <h1 className='main__title'>Shopping cart</h1>
        <Row xl={2} xs={1} md={1}>
          <Col className='cart__list' xl={8}>
            <Row className='cart__list-header'>
              <Col xl={6} md={6} xs={6}>Sản phẩm</Col>
              <Col xl={2} md={2} xs={2}>Số lượng</Col>
              <Col xl={3} md={3} xs={3}>Đơn giá</Col>
              <Col xl={1} md={1} xs={1}></Col>
            </Row>
            {cartList.length > 0 ? cartList.map((product_quality, index) => (
              <div className="cart__item" key={index}>
                <Row className="align-items-center" >
                  <Col xl={6} md={6} xs={6}>
                    <Row className="align-items-center" >
                      <Col xl={4} md={4} xs={4}>
                        <img className='detail__product-img' src={product_quality.product.image} />

                      </Col>
                      <Col xl={8} md={8} xs={8}>
                        <Row>
                          <p className='cart__product__title'>{product_quality.product.title}</p>
                        </Row>
                        <Row>
                          <p>Size:xl</p>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={2} md={2} xs={2} className="align-item-center"><p  onClick={() => handleUpdateQuality(product_quality.product, product_quality.quality, 'reduce', index)}
                    className='cursor-btn cart__quality '>-</p><p className='cart__quanlity'>{product_quality.quality}</p><p onClick={() => handleUpdateQuality(product_quality.product, product_quality.quality, 'add', index)} className=' cart__quality cursor-btn'>+</p></Col>
                  <Col xl={3} md={3} xs={2}>{product_quality.product.price}</Col>
                  <Col xl={1} md={1} xs={2} className="align-self-center">
                    <Button size={6} className='cart__btn_remove' onClick={() => handleClickRemove(product_quality.product.id)}><p>Xoa</p></Button>
                  </Col>
                </Row>
              </div>
            )) : <i class="fa-thin fa-empty-set"> Gio hang trong</i>}
          </Col>
          <Col xl={4}>
            <div className='cart__checkout'>
              <h1>Check out</h1>
            </div>
          </Col>
        </Row>
      </div>

    </Container>
  )
}

export default Cart
