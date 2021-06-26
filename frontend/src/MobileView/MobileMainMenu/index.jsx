/** @format */

import React from 'react'

import Logo from '../../images/main-logo.webp'
import './mobile-main-menu.scss'

const MobileMenuMenu = () => {
  return (
    <div className="mobile-main-menu ">
      <i className="fal fa-bars menu-bar-size"></i>
      <img src={Logo} alt="aaavape logo" className="menu-center-logo-size" />
      <i className="fas fa-search menu-bar-size"></i>
    </div>
  )
}

export default MobileMenuMenu
