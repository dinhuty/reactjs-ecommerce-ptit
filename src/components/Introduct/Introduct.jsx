import React from 'react'
import './intro.css'
import { Row, Col } from 'react-bootstrap'


const Introduct = () => {
  return (
    <div className='container intro'>
      <Row className="product_list" xl={6} md={4} xs={2}>
        <Col className="product__list-item">item1</Col>
        <Col className="product__list-item">item1</Col>
        <Col className="product__list-item">item1</Col>
        <Col className="product__list-item">item1</Col>
        <Col className="product__list-item">item1</Col>
        <Col className="product__list-item">item1</Col>
        <Col className="product__list-item">item1</Col>
        <Col className="product__list-item">item1</Col>
        
       
      </Row>
    </div>
  )
}

export default Introduct
