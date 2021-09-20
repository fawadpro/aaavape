/** @format */

import React, { useState } from 'react'
import { connect } from 'react-redux'

import { toggleMobileMenu } from '../../redux/actions/topMenu'
import Logo from '../../images/main-logo.webp'
import './mobile-main-menu.scss'

const MobileMenuMenu = ({ toggleMobileMenuFun, toggleMobileState }) => {
  return (
    <div className="mobile-main-menu ">
      {toggleMobileState ? (
        <i
          className="fas fa-times-circle menu-bar-size"
          onClick={() => toggleMobileMenuFun(false)}
        ></i>
      ) : (
        <i className="fal fa-bars menu-bar-size" onClick={() => toggleMobileMenuFun(true)}></i>
      )}

      <img src={Logo} alt="aaavape logo" className="menu-center-logo-size " />
      <i className="fas fa-search menu-bar-size"></i>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    toggleMobileMenuFun: (data) => dispatch(toggleMobileMenu(data)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    toggleMobileState: state.TopMenu.toggleMobileState,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenuMenu)
