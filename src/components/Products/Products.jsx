import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import './products.css'
import { Link, useNavigate } from 'react-router-dom'
import data from '../../data/db.json'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../Redux/cartSlice'
import axios from 'axios'
import { getProductRequest, getProduct, getTotalPage } from '../Redux/productSlice'
import SkeletonCard from './SkeletonCard'

const Products = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const listProductPage = useSelector((state) => state.productData.products)
  const loading = useSelector((state) => state.productData.loading)
  const totalPage = useSelector((state) => state.productData.totalPage)
  const renderAfterCalled = useRef(false);


  const getProData = async () => {
    dispatch(getProductRequest());
    axios.get('https://localhost:7164/api/Products/GetProduct', {
      params: {
        PageIndex: page,
        PageSize: 5
      }
    })
      .then(res => {
        dispatch(getProduct(res.data.products));
        dispatch(getTotalPage(res.data.totalPage))
      })
      .catch(err => {
        console.log(err)
      });
  }
  console.log(totalPage)
  useEffect(() => {

    if (!renderAfterCalled.current) {
      getProData()
      renderAfterCalled.current = true;
    }

  }, [page]);
  console.log(listProductPage)
  const handleAddtoCart = (product) => {
    dispatch(add(product))
  }

  let navigate = useNavigate();
  const hanldeViewProduct = (productID) => {
    navigate('/products/' + productID)
  }

  // paginate
  let maxPages = totalPage
  let items = []
  let leftSide = page - 1
  if (leftSide <= 0) leftSide = 1
  let rightSide = page + 1
  if (rightSide > maxPages) rightSide = maxPages

  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div key={number} className={(number === page ? 'active__number-bg round-effect' : 'round-effect')} onClick={() => {

        setPage(number)
        renderAfterCalled.current = false;
        dispatch(getProductRequest());
      }}>
        <p className={(number === page ? 'active__number paginate__number ' : 'paginate__number')}>{number}</p>
      </div>
    );
  }
  const nextPage = () => {
    if (page < maxPages) {
      renderAfterCalled.current = false;
      dispatch(getProductRequest());
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      renderAfterCalled.current = false;
      dispatch(getProductRequest());
      setPage(page - 1)
    }
  }

  return (
    <div className='products container'>
      <h1 className='main__title product__title'>Tất cả sản phẩm</h1>
      <Row xl={5} md={3} xs={2} className='g-4 gird__product' >
        {!loading ?
          listProductPage.map((product, index) => (
            <Col key={index}>
              <Card className='card__product'>
                <div className='card__img' onClick={() => hanldeViewProduct(product.id)}>
                  <Card.Img src={`data:image/jpeg;base64,${product.im}`} className='img__product cursor-btn' />
                </div>
                <Card.Body>
                  <Card.Title onClick={() => hanldeViewProduct(product.id)} className='cursor-btn'>{product.name}</Card.Title>
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
          : <SkeletonCard />}
      </Row>
      <div className="paginate__container">
        <div className="round-effect cursor-btn" onClick={prevPage}> <i className="fa-solid fa-caret-left"></i> </div>
        {page > 2 && <div className='round-effect-add'>...</div>}
        {items}
        {page < (maxPages - 2) && <div className='round-effect-add'>...</div>}
        <div className="round-effect cursor-btn" onClick={nextPage}> <i className="fa-solid fa-caret-right"></i> </div>
      </div>
    </div>
  )
}

export default Products
