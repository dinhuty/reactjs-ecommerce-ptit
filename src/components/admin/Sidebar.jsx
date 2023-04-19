import React from 'react'
import { DriveEtaRounded, FactCheck } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import './sidebar.css'
import { FaBeer, FaUserAlt, FaWeightHanging } from 'react-icons/fa';
import { RiLineChartFill } from "react-icons/ri";

const Sidebar = () => {
    const menuItem = [
        {
            path: "/admin",
            name: "Dashboard",
            icon: <RiLineChartFill />
        },
        {
            path: "/admin/productManagement",
            name: "Products",
            icon: <FactCheck />
        },
        {
            path: "/admin/userManagement",
            name: "User",
            icon: <FaUserAlt />
        },
        {
            path: "/admin/orderManagement",
            name: "Oder",
            icon: <FaWeightHanging />
        },
    ]
    const { pathname } = useLocation()
    console.log(pathname)
    const activeNav = menuItem.findIndex(e => e.path === pathname)
    console.log(activeNav)
    return (
        <div className='container' >
            <div className="sidebar">
                <div className="sidebar_top">
                    <h1 className="logo">Logo</h1>
                </div>
                <div className="sidebar_menu">
                    {
                        menuItem.map((item, index) => (
                            <Link to={item.path} key={index} className={index === activeNav ? 'sidebar_link active_side' : 'sidebar_link'}>
                                {console.log(index === activeNav, "cua", item.path)}
                                <div className="sidebar_icon">{item.icon}</div>
                                <div className="sidebar_linktext">{item.name}</div>
                            </Link>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Sidebar
