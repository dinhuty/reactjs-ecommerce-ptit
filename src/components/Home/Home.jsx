import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import './home.css'
import img_banner from '../../data/img_banner.jpg'
import data from '../../data/db.json'
import { Link, useNavigate } from 'react-router-dom'


export const Home = () => {


  return (
    <div className='home'>
      <Slide />
      <PolicyCard />
      <TopProducts />
    </div>
  );
}
const TopProducts = () => {

  const navigate = useNavigate();
  const hanldeViewProduct = (productID) => {
    navigate('/products/' + productID)
  }
  const count_p = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="container">
      <h1 className='home-title'>Tất cả sản phẩm</h1>
      <div className="gird-card">
        {
          data.products.map((product, index) => (
            <div className="card-products" key={product.id}>
              <div onClick={() => hanldeViewProduct(product.id)} className="product_card_img">
                <img src={product.image} className='card__img' />
              </div>
              <h2 onClick={() => hanldeViewProduct(product.id)} className='card__title'>{product.title}</h2>
              <div className="card__content">
                <span className='card__price'>{product.price}<i class="fa-solid fa-dong-sign"></i></span>
                <Link to={`/products/${product.id}`} className='card__link'>Xem chi tiết</Link>
              </div>
            </div>
          ))
        }
      </div>
      <h1 className='home-title'>Sản phẩm mới</h1>
      <div className="gird-card">
        {
          data.products.map((product, index) => (
            <div className="card-products" key={product.id}>
              <div onClick={() => hanldeViewProduct(product.id)} className="product_card_img">
                <img src={product.image} className='card__img' />
              </div>
              <h2 onClick={() => hanldeViewProduct(product.id)} className='card__title'>{product.title}</h2>
              <div className="card__content">
                <span className='card__price'>{product.price}<i class="fa-solid fa-dong-sign"></i></span>
                <Link to={`/products/${product.id}`} className='card__link'>Xem chi tiết</Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
const products = [
  {
    "id": 1,
    "title": "Giày Nike Air Jordan 1 ",
    "price": 1490000,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2022/05/air-jordan-retro-high-og-shadow-2-800x601.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  {
    "id": 2,
    "title": "Giày Nike Air Force 1 ",
    "price": 1090000,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2020/10/nike-air-force-1-low-replica-800x600.jpeg",
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  },
  {
    "id": 3,
    "title": "Giày Nike Air Jordan 1 ",
    "price": 899000,
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "men's clothing",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2020/09/Jordan-1-Retro-Black-White-1-800x600.jpg",
    "rating": {
      "rate": 4.7,
      "count": 500
    }
  },
  {
    "id": 4,
    "title": "Giày Nike Air",
    "price": 1090000,
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    "category": "men's clothing",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2021/11/nike-air-force-1-low-an20-white.jpg",
    "rating": {
      "rate": 2.1,
      "count": 430
    }
  },
  {
    "id": 5,
    "title": "Giày Nike Dunk Low",
    "price": 1290000,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2021/03/Nike-Dunk-Low-Retro-White-Black-800x600.jpg",
    "rating": {
      "rate": 4.6,
      "count": 400
    }
  },
  {
    "id": 6,
    "title": "Giày Nike Dunk Disrupt 2 ",
    "price": 1100000,
    "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    "category": "jewelery",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2022/05/dunk-disrupt-2-pale-ivory-800x600.jpg",
    "rating": {
      "rate": 3.9,
      "count": 70
    }
  },
  {
    "id": 7,
    "title": "Giày Nike Air Jo",
    "price": 1190000,
    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    "category": "jewelery",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2022/03/air-jordan-1-mid-light-smoke-grey-v2-800x600.jpg",
    "rating": {
      "rate": 3,
      "count": 400
    }
  },
  {
    "id": 8,
    "title": "Giày Nike Air Jordan 1",
    "price": 990000,
    "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    "category": "jewelery",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2021/04/jordan-1-low-panda-800x600.jpg",
    "rating": {
      "rate": 1.9,
      "count": 100
    }
  },
  {
    "id": 9,
    "title": "Giày Nike Air Jordan 1 ",
    "price": 64,
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "category": "electronics",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2021/10/air-jordan-1-low-smoke-grey-v3-800x599.png",
    "rating": {
      "rate": 3.3,
      "count": 203
    }
  },
  {
    "id": 10,
    "title": "Giày Nike Air Jordan 6 Retro",
    "price": 109,
    "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    "category": "electronics",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2021/12/Jordan-6-Retro-Travis-Scott-British-Khaki-1-800x600.jpg",
    "rating": {
      "rate": 2.9,
      "count": 470
    }
  },
  {
    "id": 11,
    "title": "Giày Nike Air Jordan 3 ",
    "price": 1190000,
    "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    "category": "electronics",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2021/11/Air-Jordan-3-Retro-Pure-White-800x600.jpg",
    "rating": {
      "rate": 4.8,
      "count": 319
    }
  },
  {
    "id": 12,
    "title": "Giày Nike Air Jordan 4 ",
    "price": 1490000,
    "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    "category": "electronics",
    "image": "https://shopgiayreplica.com/wp-content/uploads/2021/11/jordan-4-white-oreo-4-like-auth.jpg",
    "rating": {
      "rate": 4.8,
      "count": 400
    }
  }
]
const PolicyCard = () => {
  const policy = [
    {
      icon: "fa-solid fa-bag-shopping",
      name: "Miễn phí giao hàng",
      desc: "Miễn phí với đơn hàng >150k"
    },
    {
      icon: "fa-solid fa-truck-fast",
      name: "Thanh toán COD",
      desc: "Thanh toán khi nhận hàng COD"
    },
    {
      icon: "fa-solid fa-gem",
      name: "Khách hàng VIP",
      desc: "Ưu đãi dành cho khách hàng VIP"
    },
    {
      icon: "fa-solid fa-hand-holding-heart",
      name: "Hỗ trợ bảo hành",
      desc: "Hỗ trợ đổi trả nhanh chóng"
    },
  ]
  return (
    <div className="policy-card container">
      {
        policy.map((p, index) => (
          <div className="policy-card__item" key={index}>
            <div className="policy-card__icon">
              <i className={p.icon}></i>
            </div>
            <div className="policy-card__info">
              <div className="policy-card__info__name">
                <div className="span">{p.name}</div>
              </div>
              <div className="policy-card__info__description">
                <div className="span">{p.desc}</div>

              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}
const Slide = () => {

  return (
    <div className="slide container">
      <div className="slide__info">
        <div className="slide__info__title">
          <span>Polo nữ Pima cao cấp</span>
        </div>
        <div className="slide__info__desc">
          <span>Nhắc đến sự đẳng cấp là không thể không nhắc đến dòng vải pima. Nó tạo nên chất lượng tốt nhất cho bất kỳ sản phẩm thời trang nào. Sợi vải pima dài và dày hơn sợi cotton thông thường gấp đôi nhờ công nghệ dệt tân tiến. Điều đó làm cho kết cấu áo polo chắc chắn, bền chặt, hạn chế tối đa xù lông, mềm mượt, bền màu, vô cùng đảm bảo sức khoẻ người dùng</span>

        </div>
        <div className="slide__info__btn">
          <span>Xem chi tiết</span>

        </div>

      </div>
      <div className="slide__img">
        <img className='slide__img' src={img_banner} />
      </div>
    </div>
  );
}



