import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container, Row, Col, Fade } from 'react-bootstrap';
import { toast, Zoom } from 'react-toastify'
import './order.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSearchParams } from 'react-router-dom';
import { clearcart } from '../Redux/cartSlice'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

function Order() {
  const token = localStorage.getItem('token')
  const [searchParams] = useSearchParams();
  const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
  const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
  const vnp_Amount = searchParams.get('vnp_Amount')
  const dispatch = useDispatch()

  const [orderList, setOrderList] = useState([])
  const [popup, setPopup] = useState(false)
  const renderAfterCalled = useRef(false);

  const [defaultActive, setDefaultActive] = useState('home')
  // if (!renderAfterCalled.current) {
  //   // toast.success("Thanh toán thành công!", {
  //   //   position: toast.POSITION.TOP_CENTER,
  //   //   autoClose: 1000,
  //   //   transition: Zoom,
  //   //   role: "alert"
  //   // })
  //   console.log("dau buoi")
  //   renderAfterCalled.current = true;
  // }
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

    if (searchParams.get('vnp_Amount')) {
      axios.post("https://localhost:7164/AcceptPay", {
        id: vnp_OrderInfo,
        status: vnp_ResponseCode == "00" ? "Thanh toán thành công" : "Thanh toán thất bại"
      },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(res => {
          setPopup(true)
          dispatch(clearcart())

        }).catch(error => {
          console.log("error")
        })
    }
  }, [])
  console.log(renderAfterCalled.current)
  const handleCancelOrder = (id) => {
    console.log(id)
    axios.patch('https://localhost:7164/SetBill/Status', [{
      id: id,
      status: 1
    }],
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(res => {
        console.log('thanh cong')
      })
      .catch(error => console.log('Khong the huy'))
  }
  const tabs = (keys, orderList) => (
    orderList.filter(product => product.status == keys).map((product, index) =>
    (
      <div className="order_item" key={index}>
        <div className="order_item_header">
          <div className="order_item_header-left">
            <span><span>Order </span><span>#{product.id.slice(36 - 12, 36)}</span></span>
            <div>
              {
                (product.payStatus == "Chưa thanh toán" || product.payStatus == "Thanh toán thất bại") && <span className='faild'>Waitting pay</span>
              }
              {
                product.payStatus == "Thanh toán thành công" && <span className='success'>Paid</span>
              }
            </div>
          </div>
          <div className="order_item_header-right">
            <span>{product.price.toLocaleString('it-IT', { currency: 'VND' })}VND</span>
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
        {
          product.detail.map((item, index) => (
            <Row key={index} className="order_item_desc_product">
              <Col xl={2}>
                <div className="order_img_product" >
                  <img src={`data:image/jpeg;base64,${item.image}`} alt="" />

                </div>
              </Col>
              <Col xl={10}>
                <div className="order_desc_product">
                  <p>{item.name}</p>
                  <p><span>Size: </span>{item.size}</p>
                  <p><span>Số lượng: x</span>{item.totals}</p>
                </div>
              </Col>
            </Row>
          ))
        }
        <div className="order_item_btn">
          {
            keys == "Đã đặt hàng" &&
            <div className="cancel_order">
              <span className='csp' onClick={() => handleCancelOrder(product.id)}>Hủy đơn</span>
            </div>
          }
          {
            keys == "Đang giao hàng" &&
            <div className="item_received">
              <span className='csp'>Đã nhận được hàng</span>
            </div>
          }
          {
            keys == "Đã hủy đơn" &&
            <div className="item_received" >
              <span className='csp'>Đặt lại</span>
            </div>
          }
          <div className="contact_order">
            <span className='csp'>Liên hệ</span>
          </div>
        </div>
      </div>
    )
    )
  )
  const handleClose = () => {
    setPopup(false)
  }
  console.log(typeof vnp_Amount)
  return (
    <div className='order'>
      {
        popup && <>
          <div className="overlay2" onClick={handleClose}></div>
          <div className='csp popup'>
            <i className="fa-solid fa-circle-check success_icon"></i>
            <span>Thanh toán thành công!</span>
            <p>Hệ thống đã xác nhận đơn hàng của bạn số tiền là <span>{vnp_Amount.toLocaleString('it-IT', { currency: 'VND' })} VND</span>! Chờ để nhận hàng. Xin cảm ơn</p>
            <div onClick={handleClose}>OK</div>
          </div>
        </>
      }
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

                tabs("Đã đặt hàng", orderList) : <h5>Trống</h5>
            }
          </Tab>
          <Tab eventKey="profile" title="Đang vận chuyển">
            {
              orderList ?

                tabs("Đang giao hàng", orderList) : <h5>Trống</h5>
            }
          </Tab>
          <Tab eventKey="longer-tab" title="Đã giao hàng">
            {
              orderList ?

                tabs("Đã giao hàng", orderList) : <h5>Trống</h5>
            }
          </Tab>
          <Tab eventKey="contact" title="Đã hủy đơn" >
            {
              orderList ?

                tabs("Đã hủy đơn", orderList) : <h5>Trống</h5>
            }
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Order;