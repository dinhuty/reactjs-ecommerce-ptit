import React from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarAdmin from './NavbarAdmin'
import { useState } from 'react'
import { useEffect} from 'react'

const Admin = () => {
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if(!auth){
      navigate('/admin/login')
    }
  },[])
  return (
    <div>
      <NavbarAdmin />
      <Outlet></Outlet>
    </div>
  )
}

export default Admin
