/** @format */

import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { toggleMobileMenu } from '../../redux/actions/topMenu'
import { fetchMenus } from '../../redux/actions/topMenu'
import './mobile-menu-child.scss'

const MobileMenuChild = ({ history, fetchTopMenus, topMenuState, toggleMobileMenuFun }) => {
  const [showProductMenu, setShowProductMenu] = useState(false)
  const [childBackArrow, setChildBackArrow] = useState(false)
  const [childItem, setChildItem] = useState([])

  useEffect(() => {
    fetchTopMenus()
  }, [])

  const handleBackArrow = () => {
    if (childBackArrow) {
      setChildItem([])
      setChildBackArrow(false)
    } else {
      setShowProductMenu(false)
    }
  }

  const menuItem = topMenuState !== undefined ? topMenuState : {}

  let menuItemKeys = Object.keys(menuItem)
  console.log('@@ menuItem', showProductMenu)
  return (
    <div className="mobile-menu-child-container">
      <div className="child-container-body">
        {showProductMenu ? (
          <>
            <div className="mt-2 mb-4 top-left-arrow ml-3">
              <i className="fas fa-arrow-left" onClick={() => handleBackArrow()}></i>
            </div>

            {childItem && childItem.length > 0
              ? childItem &&
                childItem.map((item, index) => (
                  <div className="menu-login-part" key={index}>
                    <div
                      className="grid-menu-container"
                      onClick={() => {
                        setShowProductMenu(false)
                        toggleMobileMenuFun(false)
                        history.push(`/product-view/${item.id}`)
                      }}
                    >
                      <div className="grid-item">
                        <img src={item.image} className="image-size" />
                      </div>
                      <div className="grid-item">{item.title}</div>
                    </div>
                  </div>
                ))
              : menuItemKeys &&
                menuItemKeys.map((item, index) => (
                  <div className="menu-login-part" key={index}>
                    <div
                      className="grid-menu-container"
                      onClick={() => {
                        setChildBackArrow(true)
                        setChildItem(menuItem[item])
                      }}
                    >
                      <div className="grid-item ml-2">
                        <img src={menuItem[item][0].image} className="image-size" />
                      </div>
                      <div className="grid-item">{item}</div>
                    </div>
                  </div>
                ))}
          </>
        ) : (
          <>
            <div className="menu-title">Explore</div>
            <div className="menu-subtitle" onClick={() => setShowProductMenu(true)}>
              Products
            </div>
            <div className="menu-subtitle">Subscriptions</div>
            <div className="menu-subtitle">Get Inspired</div>
            <div className="menu-subtitle">Deals</div>
          </>
        )}

        <div className="menu-login-part ml-3">
          <div className="horizontal-line" />

          <div className="grid-menu-container">
            <div className="grid-item">
              <i className="fas fa-headset mr-2" />
            </div>
            <div className="grid-item">Support</div>
          </div>

          <div className="grid-menu-container">
            <div className="grid-item">
              <i className="fas fa-map-marker-alt mr-2" />
            </div>
            <div className="grid-item">Find a store</div>
          </div>

          <div className="footer-mobile mb-4">
            <div className="social-button mt-4" onClick={() => history.push('/login')}>
              Login
            </div>
            <div className="menu-subtitle text-center">OR</div>
            <div className="social-button mt-4" onClick={() => history.push('/register')}>
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopMenus: () => dispatch(fetchMenus()),
    toggleMobileMenuFun: (data) => dispatch(toggleMobileMenu(data)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    topMenuState: state.TopMenu.topMenus,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileMenuChild))
