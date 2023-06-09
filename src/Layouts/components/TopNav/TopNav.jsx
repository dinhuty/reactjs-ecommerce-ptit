import './topnav.css'
import React, { useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from './logo.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Zoom } from 'react-toastify'
import { Container, Navbar, Nav, Dropdown, Row, Col, Menu } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { getProduct, getProductRequest, getTotalPage } from '../../../components/Redux/productSlice'
import { authActions, selectSucccess, selectUser } from '../../../components/Redux/authSlice'
import { clearcart, add } from '../../../components/Redux/cartSlice'

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

    const hanldeSearch = async (e) => {
        e.preventDefault();
        navigate('/products')
        const getProData = async () => {
            dispatch(getProductRequest());
            axios.get('https://localhost:7164/api/Products/GetProduct', {
                params: {
                    key: textSearch,
                    PageIndex: 1,
                    PageSize: 30
                }
            })
                .then(async res => {
                    await dispatch(getProduct(res.data.products));
                    await dispatch(getTotalPage(res.data.totalPage))
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
                        {/* <img className='navbar-logo' src={logo} alt="" /> */}
                        <span>Shop</span>
                    </Link>
                </div>


                <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
                    <form onSubmit={hanldeSearch}>
                        <input type="search" placeholder="Search" onClick={()=> console.log("ok")} className='search__bar' onChange={hanldeSearch} />
                    </form>
                </div>
                <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="ms-auto d-none d-lg-block">
                        <form onSubmit={hanldeSearch}>
                            <input type="search" onChange={(e) => {
                                setTextSearch(e.target.value)
                            }
                            }
                                value={textSearch} placeholder="Tìm kiếm sản phẩm" className='search__bar' />
                        </form>
                    </div>
                    <div className="navbar-nav ms-auto ">
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={item.path}
                                    className='navbar__item'
                                >
                                    {
                                        pathname === "/" ? <Link to={item.path}>
                                            <span className={` ${(index === 0) ? 'navbar__item-link active_nav linktext' : 'navbar__item-link linktext'}`}>{item.display}</span>
                                        </Link> :
                                            <Link to={item.path}>
                                                <span className={` ${(pathname.includes(item.path) && item.path !== "/") ? 'navbar__item-link active_nav linktext' : 'navbar__item-link linktext'}`}>{item.display}</span>
                                            </Link>
                                    }
                                </div>
                            ))
                        }

                    </div>
                    <ul className="navbar-nav ms-auto ">
                        <li className={`${pathname === "/cart" ? "navbar__cart active_nav" : "navbar__cart"}`}>
                            <Link className="linktext mx-4" to="/cart"><i className="header__menu__cart fa-solid fa-cart-shopping me-2">
                                <p className='header__menu__count-cart'>{cartList.length}</p>
                            </i>Giỏ hàng</Link>

                        </li>

                        <Dropdown>
                            <Dropdown.Toggle variant="none" id="dropdown" className='navbar__dropdown__toggle'>
                                <img
                                    src={!isLogin ? "https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png" : "https://lh3.googleusercontent.com/a/AGNmyxaaijkc0gEM3Uj5OnNktNgAOmaJwCM0Ywk3p5is0A=s360"}
                                    className="rounded-circle"
                                    height="28"
                                    alt="avatar"
                                    loading="lazy"
                                />
                            </Dropdown.Toggle>

                            {
                                !isLogin ? <Dropdown.Menu className='dropdown-menu-end'>
                                    <Dropdown.Item>
                                        <Link to='/signin' className="dropdown-item" >Đăng nhập</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link to='/signup' className="dropdown-item" >Đăng ký</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />

                                    <Dropdown.Item>
                                        <Link to='/' className="dropdown-item" >Hỗ trợ</Link>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                                    :
                                    <Dropdown.Menu className='dropdown-menu-end'>
                                        <Dropdown.Item>
                                            <Link to='/' className="dropdown-item dropdown-item-account" ><i className="fa-solid fa-user"></i>{userLogin}</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>
                                            <Link to='/cart/order' className="dropdown-item" >Đơn hàng của tôi</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to='/' className="dropdown-item" >Thông báo</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to='/' className="dropdown-item" >Cài đặt</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div onClick={handleLogout} className="dropdown-item" >Đăng xuất</div>
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
