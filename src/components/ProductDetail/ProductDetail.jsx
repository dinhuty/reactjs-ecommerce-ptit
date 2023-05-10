import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import data from '../../data/db.json'
import { toast, Zoom } from 'react-toastify'
import { add } from '../Redux/cartSlice.js'
import { Rating } from '@mui/material'
import './detailproduct.css'
import { Button, Card, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { selectSucccess, selectToken } from '../Redux/authSlice'
import img from '../../data/overlay1.png'


const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams()
  const isLogin = useSelector(selectSucccess)
  const [product, setProduct] = useState({})
  const [active_guide, setActive_guide] = useState(true)
  const [topProducts, setTopproducts] = useState([])
  const [sizeChoose, setSizeChoose] = useState('')
  const [sizeShoes, setSizeShoes] = useState([])
  console.log(isLogin)
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    axios.get('https://localhost:7164/api/Products/' + id)
      .then(res => {
        setProduct(res.data)
        console.log(res.data.sizes)
        setSizeShoes(res.data.sizes)
      }).catch(error => {
        console.log(error)
      })
    getProData()
  }, [])
  const getProData = async () => {
    axios.get('https://localhost:7164/api/Products/GetProduct', {
      params: {
        PageIndex: 1,
        PageSize: 4
      }
    })
      .then(res => {
        setTopproducts(res.data.products);
      })
      .catch(err => {
        console.log(err)
      });
  }
  const hanldeViewProduct = (productID) => {
    navigate('/products/' + productID)
  }
  const handleClickAddItem = () => {
    if (!isLogin) {
      navigate('/signIn')
    } else if (sizeChoose == '') {
      toast.warning('Chọn size', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        pauseOnFocusLoss: true,
        transition: Zoom,
        role: "alert"
      })
    }
    else {
      dispatch(add({ product: product, sizeChoose: sizeChoose }))
      toast.success('Đã thêm 1 sản phẩm', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        pauseOnFocusLoss: true,
        transition: Zoom,
        role: "alert"
      })
    }
  }
  console.log(sizeChoose)
  return (
    <Container>
      <div className="detail__product">
        <p className='main__title'>Thông tin sản phẩm: </p>
        <Row xs={1} xl={2} md={2}>
          <Col xl={5}>
            <img className='detail__product-img' src={`data:image/png;base64,${product.im}`} />
          </Col>
          <Col xl={7}>
            <div className="detail__product-title">
              <span>{product.name}</span>
            </div>
            <div className="rating">
              <div className="rating_ch">
              <Rating name="size-large" defaultValue={4} size="large" />
              </div>
              <span className='csp'>Viết đánh giá</span>
            </div>
            <br />
            <p></p>
            <p className='detail__product-desc'>{product.description}</p>
            <h5>Chọn Size:</h5>
            <div className='detail__product-size'>
              {
                sizeShoes.map((size, index) => (
                  // <label className={ size.size === sizeChoose ? "product__size_number active__choose-size " : 'product__size_number'} key={index}>
                  <label className={size.size === sizeChoose ? "csp product__size_number active__choose-size " : 'csp product__size_number'} key={index}>
                    <input type="radio" name="size" value={size.size} disabled={size.qty == 0 ? true : false} onChange={(e) => setSizeChoose(e.target.value)} />
                    <div className={size.qty == 0 ? "size_number_opacity" : ""}>{size.size}</div>
                    {console.log("size", size.size, "sl:", size.qty, "bang 0:", size.qty == 0)}
                  </label>
                ))
              }
            </div>
            <p className='cursor-btn size__guide' onClick={() => setActive_guide(!active_guide)} >Bảng size</p>

            <p className='detail__product-price'>Giá: <p>{product.price && product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p></p>
            <Button onClick={handleClickAddItem} className="button__detail__add_cart cursor-btn"><p><i className="fa-sharp fa-solid fa-cart-shopping"></i>Thêm vào giỏ hàng</p></Button>
          </Col>
        </Row>
        <div className={active_guide ? 'detail__show-guide display_none' : 'detail__show-guide '}>
          <div onClick={() => setActive_guide(!active_guide)}></div>
          <img src='http://btsneaker.vn/wp-content/uploads/2021/10/cach-chon-size-giay-nike-2.jpg' alt="" />
        </div>
        <p className='other__products-title'>Sản phẩm khác:</p>
        <Row xl={4} md={3} xs={2} className='g-4 gird__product other__products' >
          {topProducts &&
            topProducts.slice(0, 4).map((product, index) => (
              <Col key={index}>
                <Card className='card__product'>
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
                    <Button className='card__btn'  > Xem chi tiết </Button>
                  </Link>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    </Container>
  )
}

export default ProductDetail
