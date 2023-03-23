import './topnav.css'
import React, { useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from './logo.jpg'
import { useSelector } from 'react-redux'
import { selectSucccess, selectToken, selectUser } from '../Redux/authSlice'
import { toast } from 'react-toastify'

export const TopNav = () => {
    const navigate = useNavigate()
    const cartList = useSelector((state) => state.cart)
    const isLogin = useSelector(selectSucccess)

    const userLogin = useSelector(selectUser)
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // navigate('/')
        window.location.reload();
        toast("Đã đăng xuất")
    }
    console.log(userLogin)
    console.log(isLogin)
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

    

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__left">
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="fa-solid fa-bag-shopping header__menu__cart ">
                                    <p className='header__menu__count-cart'>{cartList.length}</p>
                                </i>

                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item header__menu__right__item__account ">
                            {/* <Link to='/signIn'><i className="fa-solid fa-user"></i></Link> */}
                            <i className="header__account-dropdown fa-solid fa-user">

                            </i>
                            <div className={isLogin ? "dropdown-menu2 dropdown-menu" : "dropdown-menu"}>
                                {
                                    !isLogin ?
                                        <>
                                            <Link to='/signIn'><p className='dropdown__menu-item'><i className="fa-solid fa-right-to-bracket"></i>Đăng nhập</p></Link>
                                            <Link to='/signUp'><p className='dropdown__menu-item'><i className="fa-solid fa-user-plus"></i>Đăng ký</p></Link>
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
                </div>
            </div>
        </div>
    )
}
