/** @format */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import TransparentLogo from '../../images/transparent-logo.png'
import SearchInput from '../../components/SearchField'
import './desktop-main-menu.scss'

const DesktopMainMenu = ({ history, addToCartProductsState }) => {
  let extractedCartItem = []

  if (addToCartProductsState && addToCartProductsState.length > 0) {
    extractedCartItem = addToCartProductsState
  } else {
    let productStringify = JSON.parse(localStorage.getItem('addToCart'))
    extractedCartItem = productStringify
  }

  return (
    <div className="main-menu-container conatiner">
      <div className="row">
        <div className="col-md-3">
          <img
            src={TransparentLogo}
            alt="aaavape logo"
            className="logo-image"
            onClick={() => history.push('/')}
          />
        </div>
        <div className="col-md-5 text-right">
          <SearchInput />
        </div>
        <div className="col-md-4">
          <div className="row content-size">
            <div className="col-md-6">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span className="store">find a store</span>
            </div>
            <div className="col-md-6">
              <i className="fas fa-headset mr-2"></i>
              <span className="store">Support</span>
              <i
                className="fas fa-user-circle cursor-pointer ml-4 font-size-20 "
                onClick={() => history.push('/login')}
              ></i>

              <i
                className="fas fa-shopping-cart cursor-pointer ml-4"
                onClick={() => history.push('/cart')}
              ></i>

              {extractedCartItem && extractedCartItem.length > 0 && (
                <span className="icon-container">
                  <div className="cart-icon-back">
                    {extractedCartItem && extractedCartItem.length}
                  </div>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state,
    addToCartProductsState: state.Cart,
  }
}

export default withRouter(connect(mapStateToProps, null)(DesktopMainMenu))
