/** @format */

import React from 'react'

import TransparentLogo from '../../images/transparent-logo.png'
import SearchInput from '../../components/SearchField'
import './desktop-main-menu.scss'

const DesktopMainMenu = () => {
  return (
    <div className="main-menu-container conatiner">
      <div className="row">
        <div className="col-md-3">
          <img src={TransparentLogo} alt="aaavape logo" className="logo-image" />
        </div>
        <div className="col-md-6 text-right">
          <SearchInput />
        </div>
        <div className="col-md-3">
          <div className="row content-size">
            <div className="col-md-6">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span className="store">find a store</span>
            </div>
            <div className="col-md-6">
              <i className="fas fa-headset mr-2"></i>
              <span className="store">Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopMainMenu
