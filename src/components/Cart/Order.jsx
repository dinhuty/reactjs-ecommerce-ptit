import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container, Row, Col, Fade } from 'react-bootstrap';
import './order.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Order() {
  const token = localStorage.getItem('token')
  const [orderList, setOrderList] = useState()
  const [defaultActive, setDefaultActive] = useState('home')
  useEffect(() => {
    axios.get("https://localhost:7164/OrderList", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setOrderList(res.data)
    }).catch(error => {
      console.log("error")
    })
  }, [])
  console.log(orderList)
  return (
    <Container className='order'>
      <h1 className='main__title'>Danh sách đơn hàng</h1>

      <div className="order-main">
        <Tabs
          defaultActiveKey={defaultActive}
          id="fill-tab-example"
          className="mb-3"
          fill
          transition={Fade}
        >
          <Tab eventKey="home" title="Đã đặt hàng" className='testxx'>
            {
              orderList ?
                orderList.map((product, index) => (
                  <div className="order_item">
                    <div className="order_item_header">
                      <div className="order_item_header-left">
                        <span><span>Order </span><span>#3021</span></span>
                        <div>
                          <span>Paid</span>
                          </div>
                      </div>
                      <div className="order_item_header-right">
                        <span>{product.price}VND</span>
                      </div>
                    </div>
                    <div className="order_item_desc_time">
                      <span><i className="fa-regular fa-calendar"></i></span>
                      <span>{product.orderDate}</span>
                      <span>|</span>
                      <span>Shipping No: </span>
                      <span>842634872</span>
                      <span>__DC: {product.phonenumber} - {product.adress}__</span>
                    </div>
                    <Row className="order_item_desc_product">
                      <Col xl={2}>
                        <div className="order_img_product" >
                          <img src={`data:image/jpeg;base64,${product.im}`} alt="" />

                        </div>
                      </Col>
                      <Col xl={10}>
                        <div className="order_desc_product">
                           <p>{product.name}</p>
                           <p><span>Size: </span>{product.size}</p>
                           <p><span>Số lượng: x</span>{product.total}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row className="order_item_desc_product">
                      <Col xl={2}>
                        <div className="order_img_product" >
                          <img src={`data:image/jpeg;base64,${product.im}`} alt="" />

                        </div>
                      </Col>
                      <Col xl={10}>
                        <div className="order_desc_product">
                           <p>{product.name}</p>
                           <p><span>Size: </span>{product.size}</p>
                           <p><span>Số lượng: x</span>{product.total}</p>
                        </div>
                      </Col>
                    </Row>
                    <div className="order_item_btn">
                      <div className="cancel_order">
                        <span className='cspb'>Hủy đơn</span>
                      </div>
                      <div className="contact_order">
                        <span className='cspb'>Liên hệ</span>
                      </div>
                    </div>
                  </div>
                  // <Card key={index}>
                  //   <Card.Header>
                  //     <p className='order-address'><span>Giao hàng tới: SDT: 0367570800 </span><p>Xóm 2 - Xã Giao Long - Huyện Giao Thủy - Tỉnh Nam Định</p></p>
                  //   </Card.Header>
                  //   <Card.Body>
                  //     <Row>
                  //       <Col xl={10} xs={8}>
                  //         <Card.Title>
                  //         <p><span>Sản phẩm: </span>{product.name}</p>
                  //         </Card.Title>
                  //         <Card.Text>
                  //           <p><span>Size: </span>{product.size}</p>
                  //         </Card.Text>
                  //         <Card.Text>
                  //           <p><span>Số lượng: x</span>{product.total}</p>
                  //         </Card.Text>
                  //         <Card.Text>
                  //           <p><span>Giá: </span>{product.price}<span>x{product.total}</span></p>
                  //         </Card.Text>
                  //       </Col>
                  //       <Col xl={2} xs={4}>
                  //         <Card.Img variant="top" src={`data:image/jpeg;base64,${product.im}`} />
                  //       </Col>
                  //     </Row>
                  //     <Button variant="primary">Go somewhere</Button>
                  //     <Button variant="primary">Phải thanh toán: {product.price * product.total}</Button>

                  //   </Card.Body>
                  // </Card>

                )) : <h5>Trống</h5>
            }
          </Tab>
          <Tab eventKey="profile" title="Đang vận chuyển">
          </Tab>
          <Tab eventKey="longer-tab" title="Đã giao hàng">
          </Tab>
          <Tab eventKey="contact" title="Đơn hủy" >
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export default Order;