import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { add, reduce, remove } from '../Redux/cartSlice'
import './cart.css'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const cartList = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [reducePrice, setReducePrice] = useState(0)
  const handleUpdateQuality = (product, qualityx, size, title, index) => {
    if (qualityx == 1 && title == 'reduce') {
      dispatch(remove({ idProduct: product.id, sizeProduct: size }))
    } else if (title == 'reduce') {
      dispatch(reduce({ product: product, sizeChoose: size }))
    } else {
      dispatch(add({ product: product, sizeChoose: size }))
    }
  }
  // Tổng tiền sản phẩm
  const Total_price = (product, quantity) => {
    return (product.price * quantity)
  }
  useEffect(() => {
    if (cartList.length == 0) setReducePrice(0)
  }, [cartList])
  //Tổng tất cả sản phẩm
  const TotalPriceProduct = () => {
    var sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      sum = sum + Total_price(cartList[i].product, cartList[i].quality)

      console.log(Total_price(cartList[i].product, cartList[i].quality))
    }
    return sum - reducePrice
  }

  // Xóa sản phẩm
  const handleClickRemove = (id, size) => {
    dispatch(remove({ idProduct: id, sizeProduct: size }))
  }
  const hanldeAddVoucher = (e) => {
    e.preventDefault();
    if (cartList.length > 0) {
      if (TotalPriceProduct() < 100000) {
        setReducePrice(TotalPriceProduct)
      }
      else {
        setReducePrice(100000)
      }
    }
  }
  // Handle checkout
  const hanldeCheckout = () => {
    navigate('./checkout')
  }
  return (
    <Container>
      <div className="cart">
        <h1 className='main__title'>Shopping cart</h1>
        <Row xl={2} xs={1} md={1} className='g-4'>
          <Col className='cart__list' xl={8}>
            <Row className='cart__list-header'>
              <Col xl={5} md={5} xs={5}>Sản phẩm</Col>
              <Col xl={2} md={2} xs={2}>Số lượng</Col>
              <Col xl={2} md={2} xs={2}>Giá</Col>
              <Col xl={2} md={2} xs={2}>Tổng</Col>
              <Col xl={1} md={1} xs={1}></Col>
            </Row>
            {cartList.length > 0 ? cartList.map((product_quantity, index) => (
              <div className="cart__item" key={index}>
                <Row className="align-items-center" >
                  <Col xl={5} md={5} xs={5}>
                    <Row className="align-items-center" >
                      <Col xl={4} md={4} xs={4}>
                        <img className='detail__product-img' src={`data:image/jpeg;base64,${product_quantity.product.im}`} />

                      </Col>
                      <Col xl={8} md={8} xs={8}>
                        <Row>
                          <p className='cart__product__title'>{product_quantity.product.name}</p>
                        </Row>
                        <Row>
                          <p className='cart__product__size'>Size: {product_quantity.size}</p>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={2} md={2} xs={2} className="align-item-center quantity__cart_box"><p onClick={() => handleUpdateQuality(product_quantity.product, product_quantity.quality, product_quantity.size, 'reduce', index)}
                    className='cursor-btn cart__quality '>-</p><p className='cart__quanlity'>{product_quantity.quality}</p><p onClick={() => handleUpdateQuality(product_quantity.product, product_quantity.quality, product_quantity.size, 'add', index)} className=' cart__quality cursor-btn'>+</p></Col>
                  <Col xl={2} md={2} xs={2} className='cart__price'>{product_quantity.product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Col>
                  <Col xl={2} md={2} xs={2} className='cart__price'>{Total_price(product_quantity.product, product_quantity.quality).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Col>
                  <Col xl={1} md={1} xs={1} className="align-self-center">
                    <Button size={6} className='cart__btn_remove' onClick={() => handleClickRemove(product_quantity.product.id, product_quantity.size)}><p>Xoa</p></Button>
                  </Col>
                </Row>
              </div>
            )) : <i class="fa-thin fa-empty-set"> Gio hang trong</i>}
          </Col>
          <Col xl={4}>
            <div className='cart__checkout'>
              <Row className='cart__checkout__form'>
                <Form.Label className='cart__checkout__coupon'>Coupon code(code: ok):</Form.Label>
                <Col>
                  <Form.Control />
                </Col>
                <Col>
                  <Button onClick={hanldeAddVoucher} className='cart__checkout__btn__coupon'>Áp dụng</Button>
                </Col>
              </Row>
              <Row>
                <p className='cart__checkout__title__price'>Tổng tiền sản phẩm: {TotalPriceProduct().toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
              </Row>
              <Row>
                <p className='cart__checkout__title__price'>Giảm giá (Voucher): - {reducePrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
              </Row>
              <Row>
                <p className='cart__checkout__title__price'>Phí vận chuyển: 0đ</p>
              </Row>
              <Row>
                <p className='cart__checkout__title__price cart__checkout__title__price__total'>Tổng thanh toán: {TotalPriceProduct().toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
              </Row>
              <Row>
                <Button disabled={cartList.length === 0} className='cart__checkout__btn' onClick={hanldeCheckout}>Checkout</Button>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

    </Container>
  )
}

export default Cart
