import React from 'react'
import './products.css'
import { Link, useNavigate } from 'react-router-dom'
import data from '../../data/db.json'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { add } from '../Redux/cartSlice'
const Products = () => {
  const dispatch = useDispatch()
  const handleAddtoCart = (product) => {
    dispatch(add(product))
  }
  let navigate = useNavigate();
  const hanldeViewProduct = (productID) => {
    navigate('/products/' + productID)
  }
  return (
    <div className='products container'>
      <h1 className='main__title product__title'>Tất cả sản phẩm</h1>
      <Row xl={5} md={3} xs={2} className='g-4 gird__product' >
        {
          data.products.map((product, index) => (
            <Col>
              <Card key={product.id} className='card__product'>
                <div className='card__img' onClick={() => hanldeViewProduct(product.id)}>
                  <Card.Img src={product.image} className='img__product cursor-btn' />
                </div>
                <Card.Body>
                  <Card.Title onClick={() => hanldeViewProduct(product.id)} className='cursor-btn'>{product.title}</Card.Title>
                  <Card.Text>
                    <span>{product.price}<i class="fa-solid fa-dong-sign"></i></span>
                  </Card.Text>

                </Card.Body>
                <Link className='card__link__btn'>
                  <Button className='card__btn' onClick={() => handleAddtoCart(product)}  > Add to cart </Button>
                </Link>
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default Products
