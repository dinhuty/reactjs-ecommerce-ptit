import React from 'react'
import './intro.css'
import { Row, Col } from 'react-bootstrap'


const Introduce = () => {
  return (
    <div className='container_intro intro'>
      <div class="company">
        <div class="img">
          <img src="https://raw.githubusercontent.com/pico-india/main-django/main/static/about-team.jpg" alt="" />
        </div>
        <div class="company-info">
          <span>FASHION <span class="our">FOR EVERYONE</span></span>
          <p>
            <b>DSHOP</b> DSHOP, ban đầu được gọi là Blue Ribbon Sports (BRS), được thành lập bởi vận động viên điền kinh Phil Knight của Đại học Oregon và huấn luyện viên của ông, Bill Bowerman, vào ngày 25 tháng 1 năm 1964.[14] Công ty ban đầu hoạt động tại Eugene, Oregon với tư cách là nhà phân phối cho Nhà sản xuất giày Nhật Bản Onitsuka Tiger, kiếm được hầu hết doanh số bán hàng tại đường đua nhờ ô tô của Knight.[14]

            Theo Otis Davis, một sinh viên-vận động viên Đại học Oregon được huấn luyện bởi Bowerman và vận động viên giành huy chương vàng Olympic tại Thế vận hội Mùa hè 1960, huấn luyện viên của anh ấy đã làm đôi giày Nike đầu tiên cho anh ấy, mâu thuẫn với tuyên bố rằng chúng được sản xuất cho Phil Knight. Theo Davis, "Tôi đã nói với Tom Brokaw rằng tôi là người đầu tiên. Tôi không quan tâm tất cả các tỷ phú nói gì. Bill Bowerman đã làm đôi giày đầu tiên cho tôi. Mọi người không tin tôi. Thực tế là tôi không tin". Không giống như cảm giác của chúng trên chân tôi. Không có điểm tựa và chúng quá chật. Nhưng tôi đã thấy Bowerman làm chúng từ khuôn bánh quế, và chúng là của tôi".[15]
          </p>
        </div>
      </div>

      <div class="team"><span>OUR TEAM</span></div>
      <div class="container_intro">
        <div class="card_intro">
          <div class="card-image loading"><img src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /></div>
          <div class="card-info">
            <h3 class="card-title loading"><span>Yash <span class="yellow-surname">Falke</span></span></h3>
            <p class="card-description loading">
              <span class="personal-info">
                <span class="info">Graphic Designing Head</span> <br />
                Pursuing IT Engineering (VIT Mumbai) <br />
                Email: <a href="mailto:'yashfalke77@gmail.com'">yashfalke77@gmail.com</a>
              </span>
            </p>
            <div class="card-mediaIcons">
              <a href="#" class="loading" target="on_blank"><i class="fab fa-facebook-f"></i></a>
              <a href="{% url 'viewprofile' 9 %}" class="loading" target="on_blank">
                <img
                  src="https://raw.githubusercontent.com/pico-india/main-django/main/static/PICO-LOGO-SHORT.png" alt="Pico" />
              </a>
              <a href="https://www.instagram.com/yashfalke77/" class="loading" target="on_blank"><i
                class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div class="card_intro">
          <div class="card-image loading"><img src="https://media.istockphoto.com/photos/portrait-of-handsome-latino-african-man-picture-id1007763808?k=20&m=1007763808&s=612x612&w=0&h=q4qlV-99EK1VHePL1-Xon4gpdpK7kz3631XK4Hgr1ls=" alt="" /></div>
          <div class="card-info">
            <h3 class="card-title loading"><span>Harsh <span class="yellow-surname">Sunwani</span></span></h3>
            <p class="card-description loading">
              <span class="personal-info">
                <span class="info">Web Developing Head</span> <br />
                Pursuing IT Engineering (VIT Mumbai) <br />
                Email: <a href="mailto:'harshsunwani11@gmail.com'">harshsunwani11@gmail.com</a>
              </span>
            </p>
            <div class="card-mediaIcons">
              <a href="#" class="loading" target="on_blank"><i class="fab fa-facebook-f"></i></a>
              <a href="{% url 'viewprofile' 7 %}" class="loading" target="on_blank"><i><img
                src="https://raw.githubusercontent.com/pico-india/main-django/main/static/PICO-LOGO-SHORT.png" alt="Pico" /></i></a>
              <a href="https://www.instagram.com/harshsunwani/" class="loading" target="on_blank"><i
                class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div class="card_intro">
          <div class="card-image loading"><img src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></div>
          <div class="card-info">
            <h3 class="card-title loading"><span>Nikhil <span class="yellow-surname">Jaiswal</span></span></h3>
            <p class="card-description loading">
              <span class="personal-info">
                <span class="info">Marketing and Publicity Head</span> <br />
                Pursuing IT Engineering (VIT Mumbai) <br />
                Email: <a href="mailto:'nikjaiswal21@gmail.com'">nikjaiswal21@gmail.com</a>
              </span>
            </p>
            <div class="card-mediaIcons">
              <a href="#" class="loading" target="on_blank"><i class="fab fa-facebook-f"></i></a>
              <a href="{% url 'viewprofile' 6 %}" class="loading" target="on_blank"><img
                src="https://raw.githubusercontent.com/pico-india/main-django/main/static/PICO-LOGO-SHORT.png" alt="Pico" />
              </a>
              <a href="#" class="loading" target="on_blank"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Introduce
