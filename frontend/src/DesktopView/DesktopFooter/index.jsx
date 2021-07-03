/** @format */

import React from 'react'

import './desktop-footer-style.scss'

const DesktopFooter = () => {
  return (
    <div className="desktop-footer-container">
      <div className="footer-menu">
        <div className="row">
          <div className="col-md-2">
            <div className="col-main-title">
              <span>Products</span>
            </div>
            <div className="col-sub-title">Savor Series</div>
            <div className="col-sub-title">Matrix Series</div>
            <div className="col-sub-title">CUB Series</div>
            <div className="col-sub-title">Boost Series</div>
            <div className="col-sub-title">Finesse Series</div>
            <div className="col-sub-title">Atomizers</div>
            <div className="col-sub-title">Coils</div>
            <div className="col-sub-title">Apparel</div>
          </div>
          <div className="col-md-2">
            <div className="col-main-title">
              <span>Discover</span>
            </div>
            <div className="col-sub-title">About Us</div>
            <div className="col-sub-title">News</div>
            <div className="col-sub-title">Partners</div>
            <div className="col-sub-title">Store Locator</div>
            <div className="col-sub-title">To Be Distributor Or Wholesale </div>
          </div>
          <div className="col-md-2">
            <div className="col-main-title">
              <span>Customer Service</span>
            </div>
            <div className="col-sub-title">Contact Us</div>
            <div className="col-sub-title">FAQ'S</div>
            <div className="col-sub-title">Delivery & Returns Information </div>
            <div className="col-sub-title">Warranty</div>
            <div className="col-sub-title">AAA Care</div>
          </div>
          <div className="col-md-4">
            <div className="col-main-title">
              <span>SHIP FROM LOCAL WAREHOUSE</span>
            </div>
            <div className="col-sub-title">Russia</div>
            <div className="col-sub-title">Philippine</div>
          </div>
          <div className="col-md-2">
            <div className="col-main-title">
              <span> Follow Us! </span>
            </div>
            <span className="icon-size">
              <i className="fab fa-facebook "></i>
            </span>
            <span className="icon-size ml-3">
              <i className="fab fa-instagram"></i>
            </span>
            <span className="icon-size ml-3">
              <i className="fab fa-youtube"></i>
            </span>
            <span className="icon-size">
              <i className="fab fa-twitter"></i>
            </span>
            <span className="icon-size ml-3">
              <i className="fab fa-linkedin"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopFooter
