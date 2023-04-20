import React from 'react'
import { TopNav } from '../components/TopNav/TopNav'
import Footer from '../components/Footer/Footer'

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <TopNav />
            <div className="container">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayout
