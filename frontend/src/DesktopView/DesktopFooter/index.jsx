/** @format */

import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import './desktop-footer-style.scss'
import Swal from 'sweetalert2'

const DesktopFooter = ({ history }) => {
  const [productValue, setProductValue] = useState('')
  const [loader, setLoader] = useState(false)
  const validateProduct = () => {
    let bodyFormData = new FormData()
    bodyFormData.append('sn', productValue)
    setLoader(true)
    axios
      .post(
        'https://enigmatic-badlands-40184.herokuapp.com/http://m.ruiywx.com/deepin2/index.php/Home/Scanlog/deep5',
        bodyFormData
      )
      .then((res) => {
        setLoader(false)
        if (res.data.status === 'error') {
          Swal.fire('Error!', res.data.message, 'error')
        } else {
          Swal.fire('Success', res.data.message, 'success')
        }
      })
  }

  return (
    <div className="desktop-footer-container">
      <div className="footer-menu container">
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
              <i className="fab fa-youtube mr-3"></i>
            </span>
            <span className="icon-size">
              <i className="fab fa-twitter"></i>
            </span>
            <span className="icon-size ml-3">
              <i className="fab fa-linkedin"></i>
            </span>
          </div>
          <div className="col-md-4">
            <div className="col-main-title">
              <span>PRODUCT AUTHENTICATION</span>
            </div>
            <div className="security-code">
              <input
                type="text"
                placeholder="Security Code"
                className="security-code-input"
                onChange={(e) => setProductValue(e.target.value)}
              />
              <button
                className="security-code-button"
                onClick={() => validateProduct()}
                disabled={loader}
              >
                {loader ? <i className={`fa fa-circle-o-notch fa-spin loader-area`}></i> : 'Enter'}
              </button>
            </div>
            <div
              className="col-sub-bold-title mt-2"
              onClick={() => history.push('/product-verification')}
            >
              {'Click here to learn more >'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(DesktopFooter)
