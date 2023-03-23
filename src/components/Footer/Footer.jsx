import React from 'react'
import './Footer.css'
import logo from  '../TopNav/logo.jpg'
const Footer = () => {
  return (
    <footer class=" container footer-distributed">

        <div class="footer-left">

            <img className='footer-logo' src={logo} alt="logo" />

            <p class="footer-links">
                <a href="#" class="link-1">Home</a>
                
                <a href="#">Blog</a>
            
                <a href="#">Pricing</a>
            
                <a href="#">About</a>
                
                <a href="#">Faq</a>
                
                <a href="#">Contact</a>
            </p>

            <p class="footer-company-name">Company Name © 2023</p>
        </div>

        <div class="footer-center">

            <div>
                <i class="fa fa-map-marker"></i>
                <p><span>123 HaNoi - VietNam </span> 123 Nguyen Trai, Ha Noi</p>
            </div>

            <div>
                <i class="fa fa-phone"></i>
                <p>0123456789</p>
            </div>

            <div>
                <i class="fa fa-envelope"></i>
                <p><a href="mailto:support@company.com">dshop@company.com</a></p>
            </div>

        </div>

        <div class="footer-right">

            <p class="footer-company-about">
                <span>About the company</span>
                Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
            </p>

            <div class="footer-icons">

                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-facebook-messenger"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>

            </div>

        </div>

    </footer>
  )
}

export default Footer
