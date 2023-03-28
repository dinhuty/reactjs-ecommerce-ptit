import './topnav.css'
import React, { useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from './logo.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { selectSucccess, selectToken, selectUser } from '../Redux/authSlice'
import { toast } from 'react-toastify'
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { getProduct, getProductRequest, getTotalPage } from '../Redux/productSlice'
import { authActions } from '../Redux/authSlice'

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
        toast("Đã đăng xuất")
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
    const renderAfterCalled = useRef(false);

    const hanldeSearch = (e) => {
        e.preventDefault();
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


    console.log(showDropdown)
    return (
        <Navbar className="headerx" fixed='top' ref={headerRef} expand="lg">
            <Container>
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav header__menu  ">
                    <Nav className="me-auto">
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                >
                                    <Link to={item.path}>
                                        <span className='linktext '>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </Nav>

                </Navbar.Collapse>
                <div className="header__menu__right">
                    <div className="header__menu__item header__menu__right__item">
                        <form className='search-form' onSubmit={hanldeSearch}>
                            <input
                                className='search-form-text'
                                type="text"
                                value={textSearch}
                                onChange={(e) => setTextSearch(e.target.value)}
                                placeholder='Tìm kiếm sản phẩm'
                                required
                                onFocus={() => { navigate('./products') }}
                            />
                            <button type="submit">Tìm kiếm</button>
                        </form>
                        {/* <i className="fa-sharp fa-solid fa-magnifying-glass"></i> */}
                    </div>
                    <div className="header__menu__item header__menu__right__item">
                        <Link to="/cart">
                            <p className='linktext  header__menu__cart'>
                                <i className="fa-solid fa-bag-shopping header__menu__cart2">
                                    <p className='header__menu__count-cart'>{cartList.length}</p>
                                </i>
                            </p>

                        </Link>
                    </div>
                    <div className="header__menu__item header__menu__right__item header__menu__right__item__account ">
                        <i className="header__account-dropdown fa-solid fa-user">

                        </i>
                        <div className={isLogin ? "dropdown-menu2 dropdown-menu" : "dropdown-menu"}>
                            {
                                !isLogin ?
                                    <>
                                        <Link to='/signIn'><p className='dropdown__menu-item linktext'><i className="fa-solid fa-right-to-bracket"></i>Đăng nhập</p></Link>
                                        <Link to='/signUp'><p className='dropdown__menu-item linktext'><i className="fa-solid fa-user-plus"></i>Đăng ký</p></Link>
                                    </> :
                                    <>
                                        <Link to='/'><p className='dropdown__menu-item dropdown__menu-itemxxx'><i className="fa-solid fa-user"></i><p className='dropdown__menu-item-account-user'>{userLogin}</p></p></Link>
                                        <div onClick={handleLogout} className='header__logout'><p className='dropdown__menu-item'><i className="fa-solid fa-user-plus"></i>Logout</p></div>
                                    </>
                            }
                        </div>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                </div>
            </Container>
        </Navbar>
    )
}
