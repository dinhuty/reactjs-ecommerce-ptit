import React, { useState, useRef, useLayoutEffect } from 'react'
import { useEffect } from 'react'
import './products.css'
import { Link, useNavigate } from 'react-router-dom'
import data from '../../data/db.json'
import { Select, Space } from 'antd';
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
        PageSize: 8
      }
    })
      .then(res => {
        dispatch(getProduct(res.data.products));
        dispatch(getTotalPage(res.data.totalPages))
      })
      .catch(err => {
        console.log(err)
      });
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (!renderAfterCalled.current) {
      getProData()
      renderAfterCalled.current = true;
    }

  }, []);

  const handleAddtoCart = (product) => {
    dispatch(add(product))
  }

  let navigate = useNavigate();
  const hanldeViewProduct = (productID) => {
    navigate('/products/' + productID)
  }

  // paginate
  let maxPages = totalPage
  console.log(totalPage)
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

  const handleSort = async (value) => {
    dispatch(getProductRequest());
    axios.get('https://localhost:7164/api/Products/GetProduct', {
      params: {
        PageIndex: page,
        PageSize: 8,
        sort: value
      }
    })
      .then(res => {
        dispatch(getProduct(res.data.products));
        dispatch(getTotalPage(res.data.totalPages))
      })
      .catch(err => {
        console.log(err)
      });
  };

  return (
    <div className='products container'>
      <h1 className='main__title product__title'>Tất cả sản phẩm</h1>
      <div className="sort-product">
        <Select
          defaultValue="none"
          style={{ width: 120 }}
          onChange={handleSort}
          options={[
            { value: 'none', label: 'Sắp xếp giá' },
            { value: 'T', label: 'Tăng' },
            { value: 'G', label: 'Giảm' },
          ]}
        />
      </div>
      {!listProductPage && <h1>Khong co san pham nao</h1>}
      <Row xl={4} md={3} xs={2} className='g-4 gird__product' >
        {!loading ?
          listProductPage.map((product, index) => (
            <Col key={index}>
              {/* <Card className='card__product'>
                <div className='card__img' onClick={() => hanldeViewProduct(product.id)}>
                  <Card.Img src={`data:image/jpeg;base64,${product.im}`} className='img__product cursor-btn' />
                </div>
                <Card.Body>
                  <Card.Title onClick={() => hanldeViewProduct(product.id)} className='cursor-btn'>{product.name}</Card.Title>
                  <Card.Text>
                    <span>{product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                  </Card.Text>

                </Card.Body>
                <Link className='card__link__btn' to={`/products/${product.id}`}>
                  <Button className='card__btn' > Xem chi tiết </Button>
                </Link>
              </Card> */}
              <div className="product-card">
                <div className="product-image">
                  <img src={`data:image/jpeg;base64,${product.im}`} alt="Product Image" />
                  <div className="product-hover">
                    <button onClick={() => navigate(`/products/${product.id}`)} className="btn btn-primary">Xem chi tiết</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name csp" onClick={() => navigate(`/products/${product.id}`)}>{product.name}</h3>
                  <div className="product-rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <span className="product-price">{product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                </div>
              </div>




            </Col>
          ))
          : <SkeletonCard count={8} />}
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
