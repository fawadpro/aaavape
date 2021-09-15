/** @format */

import React from 'react'

import './mobile-login-style.scss'
import Logo from '../../images/main-logo.webp'
import MobileLoginInner from './mobileLoginInner'

const MobileLogin = () => {
  return (
    <>
      <div className="mobile-login-container">
        <div className="mobile-login-header">
          <img src={Logo} alt="mobile-login-page" className="header-logo" />

          <div className="header-content-body">
            <div className="header-content-title">Welcome to AAAVape</div>
            <div className="header-content-subtitle">Company for your satisfaction</div>
          </div>
        </div>

        <MobileLoginInner />
      </div>
    </>
  )
}

export default MobileLogin
