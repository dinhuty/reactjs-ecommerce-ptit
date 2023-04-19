import React from 'react'
import './navbaradmin.css'
import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavbarAdmin = () => {
    const menuItem = [
        {
            path: "/admin",
            name: "Products",
        },
        {
            path: "/admin/userManagement",
            name: "User",
        },
        {
            path: "/admin/orderManagement",
            name: "Oder",
        },
    ]
    return (
        <Navbar className='nav_admin'>
            <Container className='container'>
                <div className="nav_admin_left font_main_nav">Logo</div>
                <div className="nav_admin_center font_main_nav">
                    {menuItem.map((item,index) => (
                        <Link className='navbar__item-link font_main_nav' key={index} to={item.path}>
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="nav_admin_right font_main_nav">
                    Login/Logout
                </div>
            </Container>
        </Navbar>
    )
}

export default NavbarAdmin
