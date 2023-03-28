import React, { useState } from 'react'
import { Button, Col, Container, Row, Table, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { add, reduce, remove } from '../Redux/cartSlice'
import './cart.css'
const Cart = () => {
  const cartList = useSelector((state) => state.cart)
  const [reducePrice, setReducePrice] = useState(0)
  const handleUpdateQuality = (product, qualityx, title, index) => {
    if (qualityx == 1 && title == 'reduce') {
      dispatch(remove(product.id))
    } else if (title == 'reduce') {
      dispatch(reduce(product))
    } else {
      dispatch(add(product))
    }
  }
  // Tổng tiền sản phẩm
  const Total_price = (product, quantity) => {
    return (product.price * quantity)
  }

  //Tổng tất cả sản phẩm
  const TotalPriceProduct = () => {
    var sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      sum = sum + Total_price(cartList[i].product, cartList[i].quality)

      console.log(Total_price(cartList[i].product, cartList[i].quality))
    }
    return sum - reducePrice
  }
  const dispatch = useDispatch();

  // Xóa sản phẩm
  const handleClickRemove = (id) => {
    dispatch(remove(id))
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
  // if(cartList.length == 0) setReducePrice(0)
  return (
    <Container>
      <div className="cart">
        <h1 className='main__title'>Shopping cart</h1>
        <Row xl={2} xs={1} md={1} className='g-4'>
          <Col className='cart__list' xl={8}>
            <Row className='cart__list-header'>
              <Col xl={6} md={6} xs={6}>Sản phẩm</Col>
              <Col xl={2} md={2} xs={2}>Số lượng</Col>
              <Col xl={2} md={2} xs={2}>Giá</Col>
              <Col xl={1} md={1} xs={1}>Tổng</Col>
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
                  <Col xl={2} md={2} xs={2} className="align-item-center"><p onClick={() => handleUpdateQuality(product_quality.product, product_quality.quality, 'reduce', index)}
                    className='cursor-btn cart__quality '>-</p><p className='cart__quanlity'>{product_quality.quality}</p><p onClick={() => handleUpdateQuality(product_quality.product, product_quality.quality, 'add', index)} className=' cart__quality cursor-btn'>+</p></Col>
                  <Col xl={2} md={2} xs={2}>{product_quality.product.price}</Col>
                  <Col xl={1} md={1} xs={1}>{Total_price(product_quality.product, product_quality.quality)}</Col>
                  <Col xl={1} md={1} xs={1} className="align-self-center">
                    <Button size={6} className='cart__btn_remove' onClick={() => handleClickRemove(product_quality.product.id)}><p>Xoa</p></Button>
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
                <p className='cart__checkout__title__price'>Tổng tiền sản phẩm: {TotalPriceProduct()}đ</p>
              </Row>
              <Row>
                <p className='cart__checkout__title__price'>Giảm giá (Voucher): - {reducePrice}đ</p>
              </Row>
              <Row>
                <p className='cart__checkout__title__price'>Phí vận chuyển: 0đ</p>
              </Row>
              <Row>
                <p className='cart__checkout__title__price cart__checkout__title__price__total'>Tổng thanh toán: {TotalPriceProduct()}đ</p>
              </Row>
              <Row>
                <Button className='cart__checkout__btn'>Thanh toán</Button>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

    </Container>
  )
}

export default Cart
