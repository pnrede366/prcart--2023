import React from 'react'
import "./footer.scss"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons"
import { useLocation, useNavigate } from 'react-router'
import { logo } from '../../Helper/iconpath'

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const matchPath = location.pathname === "/admin"
  const footerLinks = [
    { text: 'Home', path: '/' },
    { text: 'Login', path: '/login' },
    { text: 'Cart', path: '/cart' },
    { text: 'SignUp', path: '/signup' }
  ];

  const socialIcons = [
    { icon: <FacebookOutlined />, link: 'https://www.facebook.com/' },
    { icon: <TwitterOutlined />, link: 'https://twitter.com/' },
    { icon: <InstagramOutlined />, link: 'https://www.instagram.com/' }
  ];
  if (matchPath) {
    return null
  }
  return (
    <footer class="footer">
      <div class="footer__content">
        <div class="footer__logo"><img src={logo} alt="" /></div>
        <div className="footer__links">
          {footerLinks.map((link, index) => (
            <span key={index} onClick={() => navigate(link.path)}>{link.text}</span>
          ))}
        </div>

        <div className="footer__social">
          {socialIcons.map((item, index) => (
            <a key={index} href={item.link}>
              {item.icon}
            </a>
          ))}
        </div>

      </div>
      <div class="footer__bottom">
        <p>&copy; prcart 2023. All rights reserved.</p>
      </div>
    </footer>)
}

export default Footer