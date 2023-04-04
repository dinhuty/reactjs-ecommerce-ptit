import './topnav.css'
import React, { useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from './logo.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { selectSucccess, selectToken, selectUser } from '../Redux/authSlice'
import { toast, Zoom } from 'react-toastify'
import { Container, Navbar, Nav, Dropdown, Row, Col, Menu } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { getProduct, getProductRequest, getTotalPage } from '../Redux/productSlice'
import { authActions } from '../Redux/authSlice'
import { clearcart, add } from '../Redux/cartSlice'

export const TopNav = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartList = useSelector((state) => state.cart)
    const isLogin = useSelector(selectSucccess)
    const [textSearch, setTextSearch] = useState('')
    const userLogin = useSelector(selectUser)
    const [showDropdown, setShowDropdown] = useState(false)

    const handleLogout = () => {
        dispatch(authActions.isLogout())
        dispatch(clearcart())
        toast.success('Đã đăng xuất', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            pauseOnFocusLoss: true,
            transition: Zoom,
            role: "alert"
        })
    }

    const mainNav = [
        {
            display: "Trang chủ",
            path: "/"
        },
        {
            display: "Sản phẩm",
            path: "/products"
        },
        {
            display: "Giới thiệu",
            path: "/introduce"
        },
        {
            display: "Liên hệ",
            path: "/contact"
        }
    ]
    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)
    const headerRef = useRef(null)

    const hanldeSearch = (e) => {
        e.preventDefault();
        navigate('./products')
        const getProData = async () => {
            dispatch(getProductRequest());
            axios.get('https://localhost:7164/api/Products/GetProduct', {
                params: {
                    key: textSearch,
                    PageIndex: 1,
                    PageSize: 10
                }
            })
                .then(res => {
                    dispatch(getProduct(res.data.products));
                    dispatch(getTotalPage(res.data.totalPage))
                    setTextSearch('')

                })
                .catch(err => {
                    console.log(err)
                });
        }
        getProData();
    }


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        })
        return () => {
            // window.removeEFventListener("scroll")
        };
    }, []);


    console.log(textSearch)
    return (
        <Navbar className="nav__header navbar p-3" fixed='top' ref={headerRef} expand="lg">
            <Container className='container_nav'>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="header__logo">
                    <Link to="/">
                        <img className='navbar-logo' src={logo} alt="" />
                    </Link>
                </div>


                <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
                    <form onSubmit={hanldeSearch}>
                        <input type="search" placeholder="Search" className='search__bar' onChange={hanldeSearch} />
                    </form>
                </div>
                <div className=" collapse navbar-collapse bg-white" id="navbarNavDropdown">
                    <div className="ms-auto d-none d-lg-block">
                        <form onSubmit={hanldeSearch}>
                        <input type="search" onChange={(e) => {
                            setTextSearch(e.target.value)
                        }
                        }
                        value={textSearch}   placeholder="Tìm kiếm sản phẩm" className='search__bar' />
                        </form>
                    </div>
                    <div className="navbar-nav ms-auto ">
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className='navbar__item'
                                >
                                    <Link to={item.path}>
                                        <span className={` ${index === activeNav ? 'navbar__item-link active linktext' : 'navbar__item-link linktext'}`}>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }

                    </div>
                    <ul className="navbar-nav ms-auto ">
                        <li className="navbar__cart">
                            <Link className="linktext mx-4" to="/cart"><i className="header__menu__cart fa-solid fa-cart-shopping me-2">
                                <p className='header__menu__count-cart'>{cartList.length}</p>
                            </i>Cart</Link>

                        </li>

                        <Dropdown>
                            <Dropdown.Toggle variant="none" id="dropdown" className='navbar__dropdown__toggle'>
                                <img
                                    src={!isLogin ? "https://w7.pngwing.com/pngs/535/466/png-transparent-google-account-microsoft-account-login-email-gmail-email-miscellaneous-text-trademark-thumbnail.png" : "https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/293331698_1513112562420236_7638095576350329681_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6RW9felPO-sAX9ZRzjA&_nc_ht=scontent.fhan5-2.fna&oh=00_AfBFtj0rkNb4QxPJ2e8l31mA1tqECIPS-dC-_8gBor96LA&oe=642BE41D"}
                                    class="rounded-circle"
                                    height="28"
                                    alt="avatar"
                                    loading="lazy"
                                />
                            </Dropdown.Toggle>

                            {
                                !isLogin ? <Dropdown.Menu className='dropdown-menu-end'>
                                    <Dropdown.Item>
                                        <Link to='/signin' class="dropdown-item" >Đăng nhập</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link to='/signup' class="dropdown-item" >Đăng ký</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />

                                    <Dropdown.Item>
                                        <Link to='/' class="dropdown-item" >Hỗ trợ</Link>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                                    :
                                    <Dropdown.Menu className='dropdown-menu-end'>
                                        <Dropdown.Item>
                                            <Link to='/' class="dropdown-item dropdown-item-account" ><i className="fa-solid fa-user"></i>{userLogin}</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>
                                            <Link to='/' class="dropdown-item" >Thông báo</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to='/' class="dropdown-item" >Cài đặt</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div onClick={handleLogout} class="dropdown-item" >Đăng xuất</div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                            }
                        </Dropdown>
                    </ul>
                </div>
            </Container>
        </Navbar >
    )
}
