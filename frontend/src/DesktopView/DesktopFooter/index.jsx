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
              <span>Legal</span>
            </div>
            <div className="col-sub-title">Patents</div>
            <div className="col-sub-title">Tobacco Rights</div>
            <div className="col-sub-title">Privacy Policy and Your California Privacy Rights</div>
            <div className="col-sub-title">User Generated Content Terms & Conditions</div>
          </div>
          <div className="col-md-2">
            <div className="col-main-title">
              <span>Terms</span>
            </div>
            <div className="col-sub-title">Terms of Use</div>
            <div className="col-sub-title">Text Messaging Terms and Conditions</div>
            <div className="col-sub-title">Site Requirements</div>
          </div>
          <div className="col-md-2">
            <div className="col-main-title">
              <span>Contact Us</span>
            </div>
            <div className="col-sub-title">Mon-Fri, 8AM-10PM & Sat-Sun 10AM-8PM EST</div>
            <div className="col-sub-title">1-877-614-8873</div>
          </div>
          <div className="col-md-2">
            <div className="col-main-title">
              <span>FAQS</span>
            </div>
            <div className="col-sub-title">Vuse Warnings & Information</div>
            <div className="col-sub-title">General Information</div>
          </div>
          <div className="col-md-2"></div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopFooter
