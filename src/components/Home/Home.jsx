import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import './home.css'
import img_banner from '../../data/img_banner.png'
import data from '../../data/db.json'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add } from '../Redux/cartSlice'
import banner from './banner.jpg'
import axios from 'axios'
import SkeletonCard from '../Products/SkeletonCard'

export const Home = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('vnp_Amount'))

  return (
    <div className='home'>
      <Slide />
      <PolicyCard />
      <TopProducts />
    </div>
  );
}
const TopProducts = () => {
  const dispatch = useDispatch()
  const handleAddtoCart = (product) => {
    dispatch(add(product))
  }
  const navigate = useNavigate();
  const hanldeViewProduct = (productID) => {
    navigate('/products/' + productID)
  }
  const [loading, setLoading] = useState(true)
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    axios.get('https://localhost:7164/api/Products/GetProduct', {
      params: {
        PageIndex: 1,
        PageSize: 15
      }
    })
      .then(res => {
        setTopProducts(res.data.products)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      });
  }, [])
  console.log(loading)

  return (
    <div className="container homepage__products">
      <h1 className='main__title  '>Sản phẩm mới</h1>
      <Row xl={4} md={3} xs={2} className='g-4 gird__product' >
        {!loading ?
          topProducts.slice(0, 4).map((product, index) => (
            <Col key={index}>
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
          : <SkeletonCard count={4} />}
      </Row>
      <h1 className='main__title'>The Latest</h1>
      <Overlay />
      <h1 className='main__title'>Trending</h1>
      <img className='home_trending csp' src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/972e353f-99a4-4838-9526-d89fd1d2eb3e/nike-just-do-it.jpg" alt="" />
      <h1 className='main__title'>Sản phẩm bán chạy</h1>
      <Row xl={4} md={3} xs={2} className='g-4 gird__product' >
        {!loading ?
          topProducts.map((product, index) => (
            <Col key={index}>
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
          : <SkeletonCard count={12} />}
      </Row>
    </div>
  );
}

const PolicyCard = () => {
  const policy = [
    {
      icon: "fa-solid fa-bag-shopping",
      name: "Miễn phí giao hàng",
      desc: "Miễn phí với đơn hàng >150k"
    },
    {
      icon: "fa-solid fa-truck-fast",
      name: "Thanh toán COD",
      desc: "Thanh toán khi nhận hàng COD"
    },
    {
      icon: "fa-solid fa-gem",
      name: "Khách hàng VIP",
      desc: "Ưu đãi dành cho khách hàng VIP"
    },
    {
      icon: "fa-solid fa-hand-holding-heart",
      name: "Hỗ trợ bảo hành",
      desc: "Hỗ trợ đổi trả nhanh chóng"
    },

  ]
  return (
    <div className="container">

      <Row xl={4} md={2} xs={1} className='g-2 policy-card'>
        {
          policy.map((p, index) => (
            <Col key={index}>
              <Card className="policy-card__item">
                <Row className='policy__desc'>
                  <Col className="policy-card__icon" xl={3} md={3} xs={3}>
                    <i className={p.icon}></i>
                  </Col>
                  <Col className="policy-card__info" xl={9} md={9} xs={9}>
                    <div className="policy-card__info__name">
                      <div className="span">{p.name}</div>
                    </div>
                    <div className="policy-card__info__description">
                      <div className="span">{p.desc}</div>

                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        }
      </Row>

    </div>
  );
}
const Slide = () => {

  return (
    <div className="slide container">
      <Row xs={1} className="align-items-center flex-column-reverse flex-md-row ">
        {/* <Col className="slide__info" xl={8}>
          <div className="slide__info__title">
            <span>Air Jordan 1 Mid SE</span>
          </div>
          <div className="slide__info__desc">
            <span>This AJ1 is all about love. Self-love, love of the game, love for life—whatever the L-word evokes for you, this foray into floral footwear symbolises the passions that push you forwards. Want to get in the weeds? Just open the box: special-edition packaging names every flower in the bouquet, plus their hidden meanings. Or you can tear past the paper and let the beauty of the blooms gracing the collar and hangtag speak for themselves. Either way, you (and the whole world) are going to fall in love with your look.</span>
          </div>
          <div className="slide__info__btn">
            <span>Xem chi tiết</span>
          </div>

        </Col>
        <Col className="slide__img" xl={4}>
          <img className='slide__img' src={img_banner} />
        </Col> */}
        <img src={banner} alt="" />
      </Row>





    </div>
  );
}

const Overlay = () => {

  return (
    <Row xl={2} md={1} xs={1} className='g-4 align-items-center'>
      <Col>
        <div className="block block1 cursor-btn">
          <div className="overlay"></div>
          <div className="block--text">
            <div className="text--head">Bắt đầu chạy</div>
            <div className="text--quote">“Bạn vẫn coi mình là một người mới, hoặc muốn cảm thấy được trang bị đầy đủ cho lần chạy đầu tiên với một đôi giày được sản xuất để giúp bạn đi.”</div>
            <div className="text--person">Walt Disney</div>
          </div>
        </div>
      </Col>
      <Col>
        <div className="block block2 cursor-btn">
          <div className="overlay"></div>
          <div className="block--text">
            <div className="text--head">Cuộc phiêu lưu</div>
            <div className="text--quote">“Bạn muốn nâng cao khả năng tiếp thu bản chất của mình và vượt ra khỏi con đường bị đánh bại hơn hầu hết mọi người, vì vậy bạn cần có độ bám và độ ổn định tốt nhất của chúng tôi.”</div>
            <div className="text--person">Walt Disney</div>
          </div>
        </div>
      </Col>
      <Col>
        <div className="block block3 cursor-btn">
          <div className="overlay"></div>
          <div className="block--text">
            <div className="text--head">Tốc độ</div>
            <div className="text--quote">“Bạn thích rút ngắn thời gian chạy tính giờ hoặc bạn sẵn sàng thi đấu với một đôi giày nhẹ hơn để giúp bạn di chuyển với tốc độ cao.”</div>
            <div className="text--person">Walt Disney</div>
          </div>
        </div>
      </Col>
      <Col>
        <div className="block block1 cursor-btn">
          <div className="overlay"></div>
          <div className="block--text">
            <div className="text--head">Bắt đầu chạy</div>
            <div className="text--quote">“Bạn vẫn coi mình là một người mới, hoặc muốn cảm thấy được trang bị đầy đủ cho lần chạy đầu tiên với một đôi giày được sản xuất để giúp bạn đi.”</div>
            <div className="text--person">Walt Disney</div>
          </div>
        </div>
      </Col>
    </Row>
  );
}