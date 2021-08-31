/** @format */

import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import ScanQR from '../../images/scan-qr.png'
import './desktop-product-verification.scss'

const DesktopProductVerfication = () => {
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
  window.scrollTo(0, 0)
  return (
    <div className="product-verification-container">
      <div className="product-verification-body">
        <div className="main-title">Is your product authentic? </div>
        <div className="security-item">
          <h2 className="item-main-title">Please enter the authentic verification code.</h2>
          <div className="check-code">
            <input
              type="text"
              placeholder="Enter the code"
              className="check-code-input"
              onChange={(e) => setProductValue(e.target.value)}
            />
            <button
              className="check-code-button"
              onClick={() => validateProduct()}
              disabled={loader}
            >
              {loader ? <i className={`fa fa-circle-o-notch fa-spin loader-area`}></i> : 'VERIFY'}
            </button>

            <p className="check-code-report">
              Report: Please report potentially counterfeit products to{' '}
              <span className="text-underline-report">support@aaavape.com</span>
            </p>
          </div>
        </div>

        <div className="security-item mb-4">
          <h2 className="item-main-title">Where can I find the authentic verification code?</h2>
          <div className="code-question">
            You can find the authentic verification code sticker on the product packaging box,
            scratch off the coating, and obtain the authentic verification code.
          </div>
          <div className="code-question-back mt-4">
            <img src={ScanQR} className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopProductVerfication
