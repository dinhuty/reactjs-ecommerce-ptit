import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'
import logo from '../TopNav/logo.jpg'
const Footer = () => {
    return (
        <Container className='footer-distributed'>
            <Row xs={1} md={1} xl={3}>


                <Col className="footer-left">
                    <img className='footer-logo' src={logo} alt="logo" />

                    <p className="footer-links">
                        <a href="#" className="link-1">Home</a>

                        <a href="#">Blog</a>

                        <a href="#">Pricing</a>

                        <a href="#">About</a>

                        <a href="#">Faq</a>

                        <a href="#">Contact</a>
                    </p>

                    <p className="footer-company-name">Company Name © 2023</p>
                </Col>

                <Col className="footer-center">
                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>123 HaNoi - VietNam </span> 123 Nguyen Trai, Ha Noi</p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        Name<p>0123456789</p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p><a href="mailto:support@company.com">dshop@company.com</a></p>
                    </div>

                </Col>

                <Col className="footer-right">

                    <p className="footer-company-about">
                        <span>About the company</span>
                        Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                    </p>

                    <div className="footer-icons">

                        <a href="#"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#"><i className="fa-brands fa-facebook-messenger"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#"><i className="fa-brands fa-youtube"></i></a>

                    </div>
                </Col>

            </Row>
        </Container>
    )
}

export default Footer
