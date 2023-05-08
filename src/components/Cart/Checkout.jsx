import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import './checkout.css'
import { toast, Zoom } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { selectSucccess } from '../Redux/authSlice'
import { clearcart } from '../Redux/cartSlice'

const Checkout = () => {
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const isLogin = useSelector(selectSucccess)
    const dispatch = useDispatch()
    const dataFetch = useRef(false)
    const [email, setEmail] = useState(null)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const cartList = useSelector((state) => state.cart)
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({
        customerName: '',
        adress: '',
        phone: '',
        products: []
    })
    const [payMethod, setPayMethod] = useState("1")
    const TotalPriceProduct = () => {
        var sum = 0;
        for (let i = 0; i < cartList.length; i++) {
            sum = sum + cartList[i].product.price * cartList[i].quality
        }
        return sum
    }
    console.log(data)
    useEffect(() => {
        if (dataFetch.current)
            return
        for (let i = 0; i < cartList.length; i++) {
            console.log(i)
            data.products.push({
                id: cartList[i].product.id,
                size: cartList[i].size,
                qty: cartList[i].quality,
                price: cartList[i].product.price
            })
        }
        dataFetch.current = true
    }, [])
    useEffect(() => {
        if (!isLogin) {
            navigate('/')
            return
        }
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        axios.get("https://localhost:7164/api/Accounts/profile/user", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setData({
                    ...data,
                    customerName: res.data.name,
                    // adress: res.data.adress,
                    phone: res.data.phonenumber
                })
                console.log(res.data)
                setEmail(res.data.email)
            }).catch(error => {
                console.log(error)
            })
    }, [isLogin])
    const changeHandler = (event) => {

        setData({ ...data, [event.target.name]: event.target.value });
    };
    const handleOrder = async (e) => {
        e.preventDefault();

        setLoading(true)
        const priceALL = TotalPriceProduct()
        await sleep(1000);
        if (!data.adress || !data.customerName || !data.phone) {
            toast.success("Điền đủ thông tin!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
                pauseOnFocusLoss: true,
                transition: Zoom,
                role: "alert"
            })
            setLoading(false)
            return
        }
        if (payMethod == "2") {
            const data2 = {
                ...data,
                payMethod: "2",
                amount: priceALL.toString()
            }
            console.log(data2)
            axios.post("https://localhost:7164/api/Order/Checkout", data2, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data)

                    setLoading(false);
                    // navigate('/cart/order')
                    // toast.success("đặt hàng thành công", {
                    //     position: toast.POSITION.TOP_CENTER,
                    //     autoClose: 1000,
                    //     pauseOnFocusLoss: true,
                    //     transition: Zoom,
                    //     role: "alert"
                    // })
                    window.location.replace(res.data.urlPayment);
                    // dispatch(clearcart())
                })
                .catch(errors => {
                    if (!errors?.response) {
                        toast("No respon server")

                    } else if (errors.response?.status === 400) {
                        toast("error")

                    } else if (errors.response?.status === 430) {
                        toast("Hết size rồi !!!!")

                    } else {
                        toast("error")

                    }
                    setLoading(false)
                })
        }
        else {
        axios.post("https://localhost:7164/api/Order/Checkout", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)

                setLoading(false);
                navigate('/cart/order')
                toast.success("đặt hàng thành công", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                    pauseOnFocusLoss: true,
                    transition: Zoom,
                    role: "alert"
                })
                dispatch(clearcart())
            })
            .catch(errors => {
                if (!errors?.response) {
                    toast("No respon server")

                } else if (errors.response?.status === 400) {
                    toast("error")

                } else if (errors.response?.status === 430) {
                    toast("Hết size rồi !!!!")

                } else {
                    toast("error")

                }
                setLoading(false)
            })
}
    }
// api get tinh
const [provinces, setProvinces] = useState([])
const [province_id, setProvince_id] = useState(-1)
const [districts, setDistricts] = useState([])
const [district_id, setDistrict_id] = useState(-1)
const [wards, setWards] = useState([])
const [ward_id, setWard_id] = useState(-1)
const [ap_number, setAp_number] = useState('')
useEffect(() => {
    axios.get('https://vapi.vnappmob.com/api/province/')
        .then(res => {
            setProvinces(res.data.results)
        })
        .catch(error => console.log(error))
}, [])
useEffect(() => {
    if (province_id === -1) {
        setDistrict_id(-1)
        return
    }
    axios.get(`https://vapi.vnappmob.com/api/province/district/${province_id}`)
        .then(res => {
            setDistrict_id(-1)
            setDistricts(res.data.results)
        })
        .catch(error => console.log(error))
}, [province_id])
useEffect(() => {
    if (district_id === -1 || province_id === -1) {
        setWard_id(-1)
        return
    }
    axios.get(`https://vapi.vnappmob.com/api/province/ward/${district_id}`)
        .then(res => {
            setWard_id(-1)
            setWards(res.data.results)
        })
        .catch(error => console.log(error))
}, [district_id, province_id])

const [address, setAddress] = useState('')
useEffect(() => {
    if (ward_id > 0) {
        var p1 = ''
        var p2 = ''
        var p3 = ''
        p1 = provinces?.find((p) => p.province_id == province_id)
        p2 = districts?.find((p) => p.district_id == district_id)
        p3 = wards?.find((p) => p.ward_id == ward_id)
        if (!ap_number) {
            setData({ ...data, adress: ap_number + p3?.ward_name + ' - ' + p2?.district_name + ' - ' + p1?.province_name })
        }
        else
            setData({ ...data, adress: ap_number + ' - ' + p3?.ward_name + ' - ' + p2?.district_name + ' - ' + p1?.province_name })
    } else {
        setData({ ...data, adress: '' })
    }

}, [district_id, province_id, ward_id, ap_number])
console.log(payMethod)
// console.log(address)

return (
    <Container>
        <div className='checkout'>
            <Row xs={1} md={1} xl={2} className=''>
                <Col xl={7} className='checkout__info c-flex gap-2 pl-1'  >
                    <p className='checkout__info-title'>Kiểm tra thông tin:</p>
                    <div className='checkout__adress__final'>
                        <p>Người nhận: {data.customerName}</p>
                        <p>SĐT: 0367570800</p>
                        <p>Giao hàng tới:{data.adress && <> {data.adress}</>}</p>
                    </div>

                    <div className='checkout__info-desc'>
                        <label>Họ tên:</label>
                        <input
                            className='input'
                            type="text"
                            name="customerName"
                            value={data.customerName}
                            onChange={changeHandler}
                            placeholder="Họ tên"
                        />
                    </div>
                    <div className='checkout__info-desc'>
                        <label>Email:</label>
                        <input
                            className='input'
                            type="text"
                            name="email"
                            value={email}
                            placeholder="Email"
                        />
                    </div>
                    <div className='checkout__info-desc'>
                        <label>Số điện thoại:</label>
                        <input
                            className='input'
                            type="text"
                            name="phone"
                            value={data.phone}
                            onChange={changeHandler}
                            placeholder="phoneNumber"
                        />
                    </div>
                    <div className='checkout__info-desc'>
                        <label className='checkout__adress'>Địa chỉ:</label>
                        <Row className='g-4'>
                            <Col>
                                <select id="provinces" name="provincesList" value={province_id} form="provincesForm" onChange={(e) => setProvince_id(e.target.value)}>
                                    <option value={-1}>Tỉnh/Thành Phố</option>
                                    {provinces?.map((item, index) => (
                                        <option key={item.province_id} value={item.province_id}>{item.province_name}</option>
                                    ))}
                                </select>
                            </Col>
                            <Col>
                                <select disabled={province_id < 0 ? true : false} id="districts" value={district_id} name="districtsList" form="districtsForm" onChange={(e) => setDistrict_id(e.target.value)}>
                                    <option value={-1}>Quận/Huyện</option>
                                    {districts?.map((item, index) => (
                                        <option key={item.district_id} value={item.district_id}>{item.district_name}</option>
                                    ))}
                                </select>
                            </Col>

                            <Col>
                                <select disabled={district_id < 0 ? true : false} id="wards" value={ward_id} name="wardsList" form="wardsForm" onChange={(e) => setWard_id(e.target.value)} >
                                    <option value={-1}>Phường/Xã</option>
                                    {wards?.map((item, index) => (
                                        <option key={item.ward_id} value={item.ward_id}>{item.ward_name}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <input
                            className='input'
                            type="text"
                            value={ap_number}
                            onChange={(e) => setAp_number(e.target.value)}
                            placeholder="Địa chỉ cụ thể ( số nhà,...)"
                        />
                        {/* <input
                                className='input'
                                disabled='true'
                                type="text"
                                name="adress"
                                value={data.adress}
                            /> */}
                    </div>

                </Col>
                <Col xl={5} className='checkout__order'>
                    <p className='checkout__info-order'>Your order:</p>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Stt</th>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Sl</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartList.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.product.name}</td>
                                    <td>{item.size}</td>
                                    <td>{item.product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    <td>{item.quality}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <br />
                    <div className='checkout__order-price'><p>Tổng tiền sản phẩm: </p><p>{TotalPriceProduct().toLocaleString('it-IT', { currency: 'VND' })}đ</p></div>
                    <div className='checkout__order-price'><p>Phí vận chuyển: </p><p>0đ</p></div>
                    <div className='checkout__order-price total__price'><p>Tổng thanh toán: </p><p>{TotalPriceProduct().toLocaleString('it-IT', { currency: 'VND' })}đ</p></div>
                    <div className='pick_paymethod'>Chọn phương thức thanh toán</div>
                    <select className="paymethod" value={payMethod} name="districtsList" form="districtsForm" onChange={(e) => setPayMethod(e.target.value)}>
                        <option value={"1"}>Thanh toán khi nhận hàng</option>
                        <option value={"2"}>Thanh toán qua ví VNPay</option>
                    </select>
                    <Button
                        className='checkout__order-btn'
                        disabled={isLoading}
                        onClick={!isLoading ? handleOrder : null}
                    >
                        {isLoading ? 'Loading...' : 'Đặt hàng'}
                    </Button>
                </Col>



            </Row>
        </div>

    </Container>

)
}

export default Checkout
